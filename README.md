# Getting Started
## SCM

```
git clone https://github.com/NeoPlace/neoplace.core.git
```
Current branch is: master

## Prerequisites
Following development tools are required to run this project

```
* GIT
* Eclipse / IntelliJ IDEA (IDE)
* Node 8 with npm 5
* angular-cli
* ionic for native app
* Android studio for Android native app
* Xcode for iOS native app
```

## Hierarchy
```
app
  app.component
  app.module
  ...           # entry point for angular app and configuration files
components
pages           # frontend HTML/CSS views
  home
  article
  service
  pay
pipes
providers       # useful class
  model
  ...
package.json
config.xml      # for mobile native app
README.md 
```

# Build

This project use npm and angular-cli >= 1.5.x for the build.
```
npm install
npm run build
or
npm start # if you want to test in live
```

