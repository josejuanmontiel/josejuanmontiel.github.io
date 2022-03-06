//go:build js || wasm

package pong

import (
	"math"
	"runtime"
	"syscall/js"
)

// Game is the structure of the game state
type JsUtils struct {
	Funcjs int
}

func (j *JsUtils) DisplayMessage(score int) {
	if runtime.GOARCH == "js" || runtime.GOOS == "js" {
		parent := js.Global().Get("parent")
		document := parent.Get("document")
		if score == 5 {
			textDiv := document.Call("getElementById", "text_from_game")
			textDiv.Set("innerHTML", "WIP Estas de suerte... <a href=\"../topic1.html\">Adelante</a>")
		}

		// document.Call("getContent", "#mi_tio")

		// p := document.Call("createElement", "p")
		// p.Set("innerHTML", "Hello WASM from Go!")
		// document.Get("body").Call("appendChild", p)
	}
}

// MyGoFunc returns a JavaScript function
func (j *JsUtils) MyGoFunc(this js.Value, args []js.Value) interface{} {
	j.Funcjs = j.Funcjs + int(math.Round(args[0].Float()))

	return map[string]interface{}{
		"hello":  "world",
		"answer": j.Funcjs,
	}
}

func (j *JsUtils) RegisterGlobalFunc() {
	// Define the function "MyGoFunc" in the JavaScript scope
	js.Global().Set("MyGoFunc", js.FuncOf(j.MyGoFunc))
}
