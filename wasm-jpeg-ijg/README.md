# JPEG codec in WASM demo

In-browser JPEG Codec demo for experimenting with different quality settings.

## Prerequisites:
* Installed emscripten SDK, available at https://github.com/juj/emsdk
* some version of 'make' installed

## To build:
```
make
```

This will generate 'jpegsquash.js' and 'jpegsquash.wasm'. Load 'index.html' from a local web server and enjoy!

To start python webserver
```
python -m SimpleHTTPServer
```
