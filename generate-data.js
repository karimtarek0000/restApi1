const faker = require("faker");
const fs = require("fs");

// 1 - Scema
function categoryList(numberOfCategory) {
  if (numberOfCategory <= 0) return [];

  const categoryList = [];
  Array.from({ length: numberOfCategory }, () => {
    const category = {
      id: faker.random.uuid(),
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
        id: faker.random.uuid(),
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

// 2 - Add in database system
const categorys = categoryList(2);
const products = productList(categorys, 2);

const db = {
  categorys,
  products,
};

// 3 - Finally add in db.json
fs.writeFile("db.json", JSON.stringify(db), () => {
  console.log("Success..");
});
