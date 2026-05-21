const retries: number = "five";  // Type 'string' is not assignable to type 'number'.
const user = { email: "john@test.com" };
console.log(user.password);      // Property 'password' does not exist on type '{ email: string; }'.


function getTimeout(seconds: number): number {
  return seconds * 1000;  // Hint: look at the return type
}


const config = { baseURL: "https://staging.example.com" };
console.log(config.baseURL);  // Hint: case matters

function printName(name: string | undefined): void {
  console.log(name);
}
const userName: string | undefined = undefined;
printName(userName);  // Hint: what if userName is undefined?

type Product = {
  name: string;
  price: number;
  inStock: boolean;
};
const productOne: Product = {
  name: "Laptop",
  price: 999.99,
  inStock: true,
};
const productTwo: Product = {
  name: "Phone",
  price: 499.99,  // Type 'number' is not assignable to type 'string'.
  inStock: false,
};

function formatPrice(price: number): string {
  return `$${price}`;
}
console.log(formatPrice(productOne.price));

