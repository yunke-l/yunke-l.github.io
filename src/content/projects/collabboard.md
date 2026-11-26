---
title: CollabBoard
description: A shared task board where small teams can assign work, discuss decisions on a card, and see updates as teammates move tasks.
image: /assets/img/projects/collabboard.webp
importance: 0
role: Full-stack development
stack: React, TypeScript, NestJS, PostgreSQL
github: https://github.com/yunke-l/CollabBoard
---

On the Website Launch board, Alex assigns Jamie the final invitation check. Jamie tests the link, records what happened on the card, and moves it to Done. Alex sees the change in his own session. [Watch the 90-second walkthrough on GitHub](https://github.com/yunke-l/CollabBoard/blob/main/media/collabboard-demo-english.mp4).

## How the boards stay in sync

After PostgreSQL saves a change, the NestJS API sends a server-sent event to the affected teammates. Their React clients fetch the updated board. If two people edit the same task at once, CollabBoard keeps the unsaved draft so its author can review the latest version before submitting again.
