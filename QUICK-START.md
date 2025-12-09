# Mentra Student Portal - Quick Start Guide

## ⚡ Get Started in 3 Steps

### Step 1: Run Setup
```bash
# Windows users:
setup.bat

# Or using Node.js:
node setup-complete.js
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Start the Server
```bash
npm start
```

### Step 4: Open Your Browser
```
http://localhost:5000
```

That's it! You should see the dashboard.

---

## 🎯 What You Get

- **Dashboard** (`/`) - Overview with stats and applied jobs
- **Jobs** (`/jobs.html`) - Browse and filter available positions  
- **Applications** (`/applications.html`) - Track your applications
- **Interviews** (`/interviews.html`) - Manage interview schedule

---

## 🎨 Design Features

- ✓ Purple/Blue gradient theme matching Figma design
- ✓ Responsive layout (works on mobile, tablet, desktop)
- ✓ Modern card-based UI
- ✓ Smooth animations
- ✓ Filter and search functionality

---

## 🔧 Troubleshooting

**Problem**: Page shows "Loading..." forever
- **Solution**: Check if MongoDB is running and server started

**Problem**: Styles not loading
- **Solution**: Make sure you ran `node create-css.js`

**Problem**: JavaScript not working
- **Solution**: Make sure you ran `node create-js.js`

**Problem**: Server won't start
- **Solution**: Check MongoDB connection in config/environment/.env.development

---

## 📝 Project Files Created

```
public/
├── index.html          ← Dashboard
├── jobs.html           ← Jobs listing
├── applications.html   ← Applications tracker
├── interviews.html     ← Interview schedule
├── css/
│   └── style.css       ← All styles
└── js/
    ├── main.js         ← Common utilities
    ├── dashboard.js    ← Dashboard logic
    ├── jobs.js         ← Jobs page logic
    ├── applications.js ← Applications logic
    └── interviews.js   ← Interviews logic
```

---

## 🚀 Development Tips

1. **Edit Styles**: Change colors/layouts in `public/css/style.css`
2. **Add Features**: Edit JS files in `public/js/`
3. **New Pages**: Create HTML in `public/` and add nav links
4. **API Integration**: Update functions in page-specific JS files

---

## 📚 Documentation

- `SETUP-INSTRUCTIONS.md` - Detailed setup guide
- `CHANGES-SUMMARY.md` - Complete list of changes
- `README.md` - Project overview

---

## ✅ Checklist

- [ ] Ran setup script
- [ ] Installed npm dependencies
- [ ] MongoDB is running
- [ ] Environment configured
- [ ] Server started successfully
- [ ] Can access dashboard in browser

---

**Need Help?** Check the documentation files or review the code comments.
