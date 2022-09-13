const faker = require("faker");
const fs = require("fs");

// 1 - Scema
function categoryList(numberOfCategory) {
  if (numberOfCategory <= 0) return [];

  const categoryList = [];
  Array.from({ length: numberOfCategory }, () => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });

  return categoryList;
}

function productList(categorys, numberOfProducts) {
  if (numberOfProducts <= 0) return [];

  const productList = [];
  for (const category of categorys) {
    Array.from({ length: numberOfProducts }, () => {
      const product = {
        id: faker.datatype.uuid(),
        categoryId: category.id,
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };
      productList.push(product);
    });
  }
  return productList;
}

function usersList(numberOfUsers) {
  if (numberOfUsers <= 0) return [];

  const usersList = [];
  for (const category of categorys) {
    Array.from({ length: numberOfUsers }, () => {
      const product = {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: Date.now(),
      };
      usersList.push(product);
    });
  }
  return usersList;
}

// 2 - Add in database system
const categorys = categoryList(10);
const products = productList(categorys, 10);
const users = usersList(10);

const db = {
  users,
  categorys,
  products,
};

// 3 - Finally add in db.json
fs.writeFile("db.json", JSON.stringify(db), () => {
  console.log("Success..");
});
