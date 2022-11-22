const a = 10;
let b = 20;

// +, -, /, *
// ===, ==, >=, <=, <, >, !=, !==
// &&, ||, !
const c = a + b;
const d = a > 10 && b < 20;

const e = "Acesta este un string.";
const f = "Acesta este alt string.";
const g = ['string1', 'string2', 'string3'];
console.log(g[0]);
g[0] = "string4";
console.log(g[0]);

const h = {
    name: 'string1',
    location: 'string2',
    postcode: 'string3',
    address: {
        street: "string4"
    }
}
console.log(h.name);
console.log(h.postcode);
h.address.street = "string5";
console.log(h.address.street);

if (a > 10 && b < 20) {
    console.log(a + b);
} else if (a == 10) {
    console.log(a);
} else {
    console.log(b);
}

let s = 0;
for (let i=0; i < 10; i++) {
    s = s + i;
}

for (const element of g) {
    console.log(element);
}

while (s > 0) {
    console.log(s);
    s = s - 1;
}

function produs(param1, param2) {
    const p = param1 * param2;
    console.log(p);
    return p;
}

function sayHello() {
    alert("Heeeeelloooo!")
}
const x = produs(10, 10);
const y = produs(a, b);

const button = document.getElementById("button");
button.onclick = sayHello;


