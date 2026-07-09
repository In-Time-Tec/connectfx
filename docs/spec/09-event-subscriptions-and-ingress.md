# Event Subscriptions And Ingress

Event subscriptions are Provider-side resources with local identity, Connection identity, provider resource, change types, delivery target, verification material, expiration, status, and renewal metadata.

The subscription service supports inspect, ensure, renew, remove, and list-expiring operations. Ensure converges on a valid subscription and does not replace a healthy subscription unnecessarily.

Ingress endpoints are consumer-owned HTTP shells over Provider-kit verification services. They validate handshakes, signatures or tokens, Provider tenant, subscription identity, and secret state; deduplicate deliveries; record receipt; enqueue durable processing; and acknowledge quickly.

ConnectFX does not decide what a provider event means to the product or route communications. Consumers and Relay adapters own downstream semantics.
