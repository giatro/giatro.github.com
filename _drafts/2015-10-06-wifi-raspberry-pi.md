---
layout: post
title:  "Setting WiFi on Raspberry Pi"
date:   2015-10-06
tags: [raspberry pi]
---

{% highlight sh %}

sudo vim /etc/wpa_supplicant/wpa_supplicant.conf

{% endhighlight %}

{% highlight sh %}

network={
ssid="AndroidAP"
psk="xJwc$4946!"
priority=2
}

{% endhighlight %}

