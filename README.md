# jsPerf-static
A static serverless clone of jsPerf.

If you're here, you probably already know that [https://jsperf.com](jsPerf.com) has been down for quite some time, with no recent progress in bringing it back online. I just couldn't get used to jsPerf-alternative benchmarking sites (no offense to those sites), so I copied the important bits of jsPerf into this static site.

- You can create your own jsPerf tests and run them. All tests are *ONLY* stored in the browser's local-storage.
- You can generate a shareable URL with the test case embedded in the querystring (as long as your test code compresses small enough to fit into a URL).

Working demo: https://twitchbronbron.github.io/jsperf-static/