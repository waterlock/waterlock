---
layout: post
title:  "Waterlock v0.0.9"
date:   2014-07-02 17:00:00
categories: waterlock update
description: "multi-logins"
author: David Rivera
---

With this release, Waterlock can now be configured to allow for multiple login methods. This means you can now have an app and allow your users to login with Facebook, Twitter, and locally all at the same time, well not the same time but you get what I mean. With this release there also comes some side effects, I have removed the custom password reset tokens in favor of Jwt, man those things are awesome. I have also took out the entire password reset system and put it in the local auth module since it currently only makes sense there. There are other various little things I've refactored to make the code base cleaner, but overall I think you guys are going to really like this build.As always if you encounter any bugs/issues please [submit](https://github.com/davidrivera/waterlock/issues) them.