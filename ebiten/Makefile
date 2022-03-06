.PHONY: wasm
wasm:
	rm -f ../game/js/wasm_exec.js ../game/wasm/game.wasm
	cp $$(go env GOROOT)/misc/wasm/wasm_exec.js ../game/js/wasm_exec.js
	GOOS=js GOARCH=wasm go build -o ../game/wasm/game.wasm .

.PHONY: native
native:
	go build -o ../game/pong .