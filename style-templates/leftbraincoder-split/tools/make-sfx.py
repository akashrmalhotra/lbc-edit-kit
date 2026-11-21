"""Synthesize a soft UI sound-effects stem (assets/sfx.wav) from tools/sfx-events.json.
Palette (Graphite Glass): dry click, soft tick (done), wooden tap (a panel lands), air (a glide),
type (keys), stop (an error). Every instance is pitch/level-varied with a seeded RNG, so
repeated cues don't sound like a loop. Deterministic: the same events give the same file.
usage: python tools/make-sfx.py <duration-seconds>
"""
import json, os, wave
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
import sys
SR = 48000
DUR = float(sys.argv[1]) if len(sys.argv) > 1 else 38.2  # pass the composition duration
rng = np.random.default_rng(7)


def env(n, attack, decay):
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    return a * np.exp(-t / decay)


def bandnoise(n, lo, hi):
    x = rng.standard_normal(n)
    f = np.fft.rfft(x); fr = np.fft.rfftfreq(n, 1 / SR)
    f[(fr < lo) | (fr > hi)] = 0
    y = np.fft.irfft(f, n)
    return y / (np.abs(y).max() + 1e-9)


def sine(n, f0, f1=None):
    f1 = f1 or f0
    t = np.arange(n) / SR
    ph = 2 * np.pi * np.cumsum(np.linspace(f0, f1, n)) / SR
    return np.sin(ph)


def click(p):   # dry, short, high: UI selection
    n = int(0.03 * SR)
    return 0.55 * bandnoise(n, 2500 * p, 6000 * p) * env(n, 0.0005, 0.004) + 0.35 * sine(n, 900 * p) * env(n, 0.0005, 0.006)


def type_(p):   # tiny key tap
    n = int(0.025 * SR)
    return 0.45 * bandnoise(n, 1800 * p, 5000 * p) * env(n, 0.0003, 0.003)


def tick(p):    # soft rounded "done" tone
    n = int(0.16 * SR)
    return (0.5 * sine(n, 1320 * p) + 0.18 * sine(n, 2640 * p)) * env(n, 0.002, 0.045)


def tap(p):     # muted wooden tap: a panel or chip lands
    n = int(0.12 * SR)
    return 0.7 * sine(n, 520 * p, 380 * p) * env(n, 0.001, 0.025) + 0.15 * bandnoise(n, 800, 3000) * env(n, 0.0005, 0.006)


def air(p):     # soft breath for a glide or a card morph
    n = int(0.32 * SR)
    t = np.arange(n) / n
    shape = np.sin(np.pi * t) ** 2
    return 0.35 * bandnoise(n, 600 * p, 4200 * p) * shape


def stop(p):    # dry low stop for an error
    n = int(0.14 * SR)
    return 0.8 * sine(n, 240 * p, 170 * p) * env(n, 0.001, 0.035) + 0.2 * bandnoise(n, 300, 1500) * env(n, 0.0005, 0.01)


KINDS = {"click": click, "type": type_, "tick": tick, "tap": tap, "air": air, "stop": stop}
LEVEL = {"click": 0.16, "type": 0.07, "tick": 0.14, "tap": 0.18, "air": 0.08, "stop": 0.22}  # linear peaks before the stem gain

events = json.load(open(os.path.join(HERE, "sfx-events.json")))
out = np.zeros(int(DUR * SR) + SR)
for ev in events:
    kind, t = ev["k"], ev["t"]
    p = 1 + rng.uniform(-0.06, 0.06)               # pitch variation
    g = LEVEL[kind] * ev.get("g", 1) * (1 + rng.uniform(-0.15, 0.1))
    s = KINDS[kind](p) * g
    # "air" peaks mid-sound; start it early so its peak lands on the event time
    i = int((t - (0.16 if kind == "air" else 0.0)) * SR)
    if i < 0: s, i = s[-i:], 0
    out[i:i + len(s)] += s[: len(out) - i]

out = out[: int(DUR * SR)]
peak = np.abs(out).max()
stereo = np.stack([out, out], 1)
pcm = (np.clip(stereo, -1, 1) * 32767).astype("<i2")
with wave.open(os.path.join(HERE, "..", "assets", "sfx.wav"), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print(f"{len(events)} cues, peak {20 * np.log10(peak + 1e-9):.1f} dBFS")
