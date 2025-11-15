// T5. Técnicas para mejorar la estructura y robustez de código
// U1. Gestión de errores y excepciones
// Enunciado disponible en u1e1.md / Enunciat disponible a u1e1.md
// ======================================================
//  Clase InventoryManager
// ======================================================

export class InventoryManager {
  #productList = [];

  init(products = []) {
    const errors = [];

    for (const product of products) {
      const result = this.addProduct(product);

      if (!result.status) {
        errors.push(result.message);
      }
    }

    return errors.length === 0 ? true : errors;
  }

  nProducts() {
    return this.#productList.length;
  }

  validateProduct(product) {
    const { code, name, price, discount, amount } = product;

    const isInteger = (x) => Number.isInteger(x) && x >= 0;
    const isValidPrice = (x) =>
      typeof x === "number" && x > 0 && Number(x.toFixed(2)) === x;

    if (
      !isInteger(code) ||
      typeof name !== "string" ||
      name.trim() === "" ||
      !isValidPrice(price) ||
      !isInteger(discount) ||
      !isInteger(amount)
    ) {
      throw `ERROR_DATA. Alguno de los datos del producto (${code}) no tiene un formato válido.`;
    }

    if (this.#productList.some((p) => p.code === code)) {
      throw `INVENTORY_CODE. Ya existe otro producto con ese código (${code}).`;
    }

    if (this.#productList.some((p) => p.name === name)) {
      throw `INVENTORY_NAME. El nombre del producto (${code}) ya existe.`;
    }

    if (price < 50) {
      throw `INVENTORY_PRICE. El precio del producto (${code}) no puede ser inferior a 50.`;
    }

    if (discount < 0 || discount > 10) {
      throw `INVENTORY_DISCOUNT. El descuento del producto (${code}) debe estar entre 0 y 10.`;
    }

    if (amount < 10) {
      throw `INVENTORY_AMOUNT. La cantidad de producto (${code}) no puede ser inferior a 10.`;
    }

    return true;
  }

  addProduct(product) {
    let status = false;
    let message = "";

    try {
      this.validateProduct(product);
      this.#productList.push(product);
      status = true;
      message = `INVENTORY_ADD. El producto (${product.code}) ha sido añadido con éxito al inventario.`;
    } catch (err) {
      status = false;
      message = err;
    } finally {
      return { status, message };
    }
  }
}
