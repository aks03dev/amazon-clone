import { buffer } from "micro";
import * as admin from "firebase-admin";

// Connection to firebase from backend
const serviceAccount = require("../../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();
const fulfillOrder = async (session) => {
  console.log("Fulfilling order", session);
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: order ${session.id} has been added to the DB`);
    });
};
// Connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
export default async (req, res) => {
  if (req.method === "POST") {
    //a certificate to verify the webhook
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    let event;

    // Verify webhook signature and extract the event.
    // See https://stripe.com/docs/webhooks/signatures for more information.
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // handling checkout session complete event given by Stripe after it has been verified
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //   fulfill the order by storing it in firebase database

      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }

    // res.json({ received: true });
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
