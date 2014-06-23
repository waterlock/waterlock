---
layout: post
title:  "Waterlock v0.0.8"
date:   2014-06-22 17:00:00
categories: waterlock update
description: "we've changed somethings"
author: David Rivera
---

Waterlock now supports JSON Web Tokens! So a while back I was introduced to JWT, I was skeptical at first but soon realized that this could really add value to my Waterlock project. So that night, I started hammering away and doing some in depth reading on [JWT](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-23). Finally I came out with what I believe is a cleaner waterlock.

What changed? Well a lot, if you're on an older version of Waterlock and switch to .8 you may or may not be disappointed. The biggest change is the ApiKey model. That was taken out in favor of JWT since they can do everything and more. Sorry... 

Onto the future! With this new release Waterlock is easier and more fun to use than ever. I really hope you guys enjoy using it as much as I've had developing it. If you encounter any issues please feel free to open an [issue](https://github.com/davidrivera/waterlock/issues).