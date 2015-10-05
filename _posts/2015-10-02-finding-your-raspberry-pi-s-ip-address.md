---
layout: post
title:  "Finding Your Raspberry Pi's IP Address"
date:   2015-10-02
tags: [raspberry pi]
---

{% highlight sh %}

nmap -p 22 --open -sV 192.168.1.*

{% endhighlight %}