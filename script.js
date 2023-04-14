const ROWS = 10
const COLUMNS = 10
const START_COOLDOWN = 500
const LEVEL_COOLDOWN = 20
const CELL_SIZE = 60
const CELL_MARGIN = 1
const GAME_PADDING = 5
const FOOD_COLOR = '#7CFC00'
const SNAKE_COLOR = '#006400'
const FREE_COLOR = '#DDA0DD'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = CELL_SIZE * COLUMNS + (COLUMNS - 1) * CELL_MARGIN + 2 * GAME_PADDING
canvas.height = CELL_SIZE * ROWS + (ROWS - 1) * CELL_MARGIN + 2 * GAME_PADDING

let map = createGameMap(COLUMNS, ROWS)

getRandomFreeCell(map).food = true


const cell = getRandomFreeCell(map)
let snake = [cell]
cell.snake = true

let snakeDirect = 'right'
let nextSnakeDirect = 'right'

requestAnimationFrame(loop)
let prevTick = 0
let play = true
let cooldown = START_COOLDOWN

function loop (timestamp) {
	requestAnimationFrame(loop)

	clearCanvas()
	if (prevTick + cooldown <= timestamp && play) {
		prevTick = timestamp

		snakeDirect = nextSnakeDirect
		moveSnake()
		const head = snake[0]
		const tail = snake[snake.length - 1]

		if (head.food) {
			head.food = false
			snake.push(tail)

			getRandomFreeCell(map).food = true
			cooldown -= LEVEL_COOLDOWN
		}

		else {
			let isEnd = false
			for (let i = 1; i < snake.length; i++) {
				if (snake[i] === snake[0]) {
					isEnd = true
					break
				}
			}
			if (isEnd) {
				play = false
			}
		}
	}

	drawGameMap(map)
	showState()

	if (!play) {
		drawPaused()
	}
}

document.addEventListener("keydown", function (event) {
	if (event.key === "ArrowUp") {
		if (snake.length === 1 || snakeDirect === "left" || snakeDirect === "right") {
			nextSnakeDirect = "up"
		}
	}

	else if (event.key === "ArrowDown") {
		if (snake.length === 1 || snakeDirect === "left" || snakeDirect === "right") {
			nextSnakeDirect = "down"
		}
	}

	else if (event.key === "ArrowLeft") {
		if (snake.length === 1 || snakeDirect === "up" || snakeDirect === "down") {
			nextSnakeDirect = "left"
		}
	}

	else if (event.key === "ArrowRight") {
		if (snake.length === 1 || snakeDirect === "up" || snakeDirect === "down") {
			nextSnakeDirect = "right"
		}
	}

	else if (event.key === 'Enter') {
		if (play) {
			return
		}
		init()
	}
})
