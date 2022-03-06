package pong

import (
	"strconv"

	"github.com/hajimehoshi/ebiten"
	"github.com/hajimehoshi/ebiten/text"
)

func DrawFromJs(funcjs int, screen *ebiten.Image) {
	w, _ := screen.Size()
	var texts []string
	texts = []string{
		"",
		"",
		"",
		"",
		"",
		"",
		"->" + strconv.Itoa(funcjs) + "<-",
	}
	for i, l := range texts {
		x := (w - len(l)*fontSize) / 2
		text.Draw(screen, l, ArcadeFont, x, (i+4)*fontSize, ObjColor)
	}
}
