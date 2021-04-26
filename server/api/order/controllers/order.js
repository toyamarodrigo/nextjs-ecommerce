"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { token, products, idUser, shippingAddress } = ctx.request.body;

    let totalPayment = 0;

    products.forEach((product) => {
      totalPayment = totalPayment + product.price;
    });

    const charge = await stripe.charges.create({
      amount: totalPayment * 100,
      currency: "usd",
      source: token.id,
      description: `User ID: ${idUser}`,
    });

    const createOrder = [];

    for await (const product of products) {
      const data = {
        game: product.id,
        users_permissions_user: idUser,
        totalPayment,
        idPayment: charge.id,
        shippingAddress,
      };
      const validData = await strapi.entityValidator.validateEntityCreation(
        strapi.models.order,
        data
      );
      const entry = await strapi.query("order").create(validData);
      createOrder.push(entry);
    }

    console.log(createOrder);

    return createOrder;
  },
};
