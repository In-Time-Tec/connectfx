# Managed Resources And Reconciliation

Managed resources are an optional capability for Provider-side objects whose state ConnectFX maintains. A resource definition owns Provider-specific desired, observed, identity, plan, apply, and delete schemas and operations.

Core reconciliation provides:

- deterministic resource identity and idempotency keys;
- inspect desired and observed state;
- produce an ordered plan;
- require approval for destructive changes;
- apply one side-effecting step at a time;
- wait through provider eventual consistency;
- verify convergence;
- record drift and Administrator actions.

Core does not define generic mailboxes, bots, users, groups, aliases, or licenses. Those remain Provider resource kinds until a second real provider proves a shared contract.

A simple Connection may never enable managed resources.
