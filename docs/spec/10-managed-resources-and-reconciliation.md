# Managed Resources And Reconciliation

Managed resources are an optional capability for Provider-side objects whose state ConnectFX maintains. A resource definition owns Provider-specific desired, observed, identity, plan, apply, and delete schemas and operations.

Connection-local reconciliation provides:

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

This boundary converges one Connection's provider resource against provider facts. Relay owns sequencing product intent across multiple Connections, resources, agents, communications, or human decisions. Relay may wait on the OperationId but must not mirror reconciliation steps. No universal generic reconciliation API is required for the first shared-mailbox slice.
