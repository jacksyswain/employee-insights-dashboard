# Employee Insights Dashboard

A React-based Employee Insights Dashboard built to demonstrate advanced frontend engineering concepts such as custom virtualization, browser hardware access, canvas image processing, and SVG data visualization.

This project focuses on **performance, architecture, and browser APIs**, rather than UI libraries.

---

# Project Overview

The application contains four main screens:

1. Login (Secure Authentication)
2. Employee List (High-Performance Virtualized Grid)
3. Employee Details (Camera Capture + Signature Verification)
4. Analytics Dashboard (SVG Chart + Geospatial Map)

The assignment intentionally emphasizes engineering depth including:

* React rendering lifecycle
* Browser hardware interaction
* Custom virtualization logic
* Canvas manipulation
* SVG visualization
* Performance awareness

---

# Features

## 1. Secure Authentication

Authentication is implemented using **React Context API**.

Login credentials:

Username: **testuser**
Password: **Test123**

### Implementation Details

* Auth state is stored in Context.
* Session persistence is handled using **localStorage**.
* Protected routes prevent unauthorized access.
* If a user manually navigates to `/list` or `/details`, they are redirected to login.

Example logic:

```
if (!user) {
  return <Navigate to="/" />
}
```

---

# 2. High Performance Virtualized Grid

Large datasets can significantly slow down DOM rendering.

Instead of rendering thousands of rows, this project implements **custom virtualization from scratch**.

### Concept

Only rows visible in the viewport are rendered.

Example:

Viewport height: 600px
Row height: 50px

Visible rows:

```
600 / 50 = 12 rows
```

A small buffer is added to prevent flickering.

---

### Virtualization Math

Key calculations used:

```
startIndex = floor(scrollTop / rowHeight)
visibleRows = containerHeight / rowHeight
endIndex = startIndex + visibleRows + buffer
```

Offset calculation:

```
offsetY = startIndex * rowHeight
```

Rows are positioned using:

```
transform: translateY(offsetY)
```

The container height simulates the full dataset:

```
totalRows * rowHeight
```

This creates the illusion of a full list while rendering only a small subset of rows.

---

# 3. Identity Verification (Camera + Signature)

The employee details page demonstrates interaction with **browser hardware APIs**.

### Camera Access

The browser camera is accessed using:

```
navigator.mediaDevices.getUserMedia({ video: true })
```

A video stream is displayed inside a `<video>` element.

---

### Photo Capture

The captured frame is drawn to a canvas:

```
ctx.drawImage(video, 0, 0)
```

The image is then exported as Base64:

```
canvas.toDataURL("image/png")
```

---

### Signature Capture

A second canvas allows users to draw a signature using mouse events.

Events used:

* mousedown
* mousemove
* mouseup

Drawing is performed using:

```
ctx.lineTo(x, y)
ctx.stroke()
```

---

### Image Merge

The captured photo and signature canvas are merged into a single image.

Steps:

1. Create new canvas
2. Draw captured photo
3. Draw signature canvas
4. Export merged image

Example:

```
ctx.drawImage(photo)
ctx.drawImage(signatureCanvas)
```

The final merged image represents the **audit verification image**.

---

# 4. Analytics Dashboard

The analytics page visualizes employee data using two techniques.

---

## SVG Salary Distribution Chart

Salary distribution per city is rendered using **raw SVG elements**.

No chart libraries such as Chart.js or D3 are used.

Example elements:

* `<rect>` for bars
* `<text>` for labels

Example structure:

```
<svg>
  <rect x="10" y="50" width="40" height="120" />
  <text>Delhi</text>
</svg>
```

Each bar represents the **total salary paid in a city**.

---

## Geospatial Mapping

City locations are displayed using **Leaflet**.

Because the API only returns city names, coordinates are mapped using a dictionary.

Example:

```
Delhi → [28.7041, 77.1025]
Mumbai → [19.0760, 72.8777]
Bangalore → [12.9716, 77.5946]
```

Markers are displayed for each city on the map.

Clicking a marker displays a popup containing city salary information.

---

# Project Structure

```
src
│
├── components
│   └── ProtectedRoute.jsx
│
├── context
│   └── AuthContext.jsx
│
├── pages
│   ├── Login.jsx
│   ├── List.jsx
│   ├── Details.jsx
│   └── Analytics.jsx
│
├── services
│   └── api.js
│
├── App.jsx
└── main.jsx
```

---

# Technologies Used

* React
* React Router
* Leaflet
* HTML5 Canvas
* SVG
* JavaScript (ES6)

No UI component libraries were used.

---

# Intentional Bug (Assignment Requirement)

An intentional performance bug was introduced in `List.jsx`.

A scroll event listener is attached using `useEffect`, but the cleanup function is intentionally omitted.

Example:

```
useEffect(() => {
  window.addEventListener("scroll", handleScroll)
}, [])
```

Because `removeEventListener` is missing, the listener persists if the component unmounts multiple times.

This can lead to **increased memory usage over time**, demonstrating a common lifecycle bug in React applications.

This bug was intentionally left to satisfy the assignment requirement.

---

# Running the Project

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

# Demo Flow

1. Login using test credentials
2. Scroll the employee list to observe virtualization
3. Open employee details
4. Capture photo using camera
5. Draw signature
6. Merge photo and signature
7. View analytics dashboard with chart and map

---

# Conclusion

This project demonstrates advanced frontend engineering concepts including:

* custom virtualization
* browser hardware access
* canvas image manipulation
* SVG visualization
* geospatial mapping

The focus was on **performance, architecture, and browser capabilities rather than UI libraries**.
