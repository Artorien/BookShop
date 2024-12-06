import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QKnpqJWc4I3WBT8aazYFltdOuUxluzvqdahnicmIedH4BVNyDrefaoYnuozN4O5bD09kLHwfIOnUUj2a4qW6ziV00jO2Q63DU"
);
export default stripePromise;
