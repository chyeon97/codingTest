const fs = require('fs');
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");
const N = +input[0];

class Deque {
	constructor() {
		this.deque = {};
		this.head = 0;
		this.rear = 0;
	}

	push_back = (item) => {
		this.deque[this.rear++] = item
	}

	push_front = (item) => {
		this.deque[--this.head] = item
	}

	pop_back = () => {
		if(this.empty()) return "-1";
		this.rear--;
		const value = this.deque[this.rear];
		delete this.deque[this.rear]
		return value;
	}

	pop_front = () => {
		if(this.empty()) return "-1";
		const pos = this.head;
		const value = this.deque[pos];
		delete this.deque[pos]
		this.head++;
		return value;
	}

	size = () => {
		return this.rear - this.head;
	}

	empty = () => {
		return this.rear == this.head ? 1 : 0;
	}

	front = () => {
		if(this.empty()) return "-1";
		return this.deque[this.head];
	}

	back = () => {
		if(this.empty()) return "-1";
		const pos = this.rear-1
		return this.deque[pos];
	}
}

const myDeque = new Deque();
const answer = [];
for(let i = 0; i < N; i++){
	const command = input[i+1].split(" ");

	switch (command[0]){
		case "push_back":
			myDeque.push_back(command[1])
			break;

		case "push_front":
			myDeque.push_front(command[1])
			break;

		case "front":
			answer.push(myDeque.front());
			break;

		case "back":
			answer.push(myDeque.back());
			break;

		case "size":
			answer.push(myDeque.size());
			break;

		case "empty":
			answer.push(myDeque.empty());
			break;

		case "pop_front":
			answer.push(myDeque.pop_front());
			break;

		case "pop_back":
			answer.push(myDeque.pop_back());
			break;
	}
}

console.log(answer.join("\n"))