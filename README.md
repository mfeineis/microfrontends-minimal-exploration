# micro-frontends-exploration
This is a simple exploration of how a UI could be composed out of simple
widgets provided by services at runtime. There is most certainly plenty of
room for improvement but the goal of this repo is to show what you can
achieve with minimal means.

## Setup
* Make sure you have [NodeJS 6+](https://nodejs.org) installed
* `git clone https://github.com/mfeineis/micro-frontends-exploration`
* `cd micro-frontends-exploration`
* `npm run setup`
* Visit http://localhost:8081/ to see the live interaction

## Overview
Each directory represents a microservice that provides its own widgets that
the main page sticks together. No widget needs to care which technologies are
involved, everything built using Elm? Great! Some plain JS, why not! A 
framework-of-the-week app, if you really need to :-).

```
+- main/index.html (Oldschool webpage composing widgets)
+- counter/fragments/counter.js (A simple Elm app with ports)
+- search/fragments/search.js (A widget implemented as a CustomElement)
+- shop/fragments/cart.js (A bare-bones JS widget)
```
