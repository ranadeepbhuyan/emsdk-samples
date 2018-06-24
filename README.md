# emsdk-samples
Web-assembly hello world and more

#### Hello.c
emcc hello.c -s WASM=1 -o hello.html

#### Hello 2:
emcc -o hello2.html hello2.c -O3 -s WASM=1 --emrun --shell-file template/shell_minimal.html

#### Hello 3:
emcc -o hello.html hello.c -O3 -s WASM=1 --emrun --shell-file template/shell_minimal.html -s NO_EXIT_RUNTIME=1  -s EXTRA_EXPORTED_RUNTIME_METHODS=‘[“ccall”]’
