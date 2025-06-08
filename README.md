# Altris Residence – Shuttle Countdown 🚌

A zero-dependency, single-file web page that tells residents **when the next free shuttle van leaves Altris Residence or LRT Sri Rampai**, with a live countdown that updates every minute.

[**Demo screenshot →**](docs/demo.png)

---

## ✨ Features
|  |  |
|---|---|
| **Instant** | Just an `index.html` — drop it anywhere, no build tools required. |
| **Live countdown** | Refreshes every 60 s; shows “Now” when the van should depart. |
| **Smart rollover** | After the last trip it rolls to tomorrow’s first departure. |
| **Weekend guard** | Displays a friendly note on Saturdays & Sundays. |
| **Easily editable** | Update the time arrays at the top of the script to change the timetable. |
| **Responsive** | Works great on mobile lobby displays, tablets and desktops. |
| **Powered by SkyMart** | Footer link credits the sponsor. |

---

## 🚀 Quick start

```bash
git clone https://github.com/<you>/altris-shuttle.git
cd altris-shuttle
open index.html        # or just double-click in Finder/Explorer
```

The schedule expands to show all remaining trips for the day when you tap on each card.
