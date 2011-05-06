# Coffee-Resque Demo

This is the repo for the demo on the coffee-resque library. The demo is done on mid May 2011, at Hackerspace.sg for the Singapore Ruby Brigrade.

## Dependencies

The node.js libs required are contained under the node_modules directory. The other dependecies are:

- Node.js(tested on 0.4.7)
- Redis(tested on 2.2.2)

## Running it

1. Start redis
2. View localhost:3000 on your web browser
3. Run these commands

    $ node scripts/pap_minister.js
    $ node scripts/opposition.js
    $ node scripts/queue_jobs.js
    $ node server.js

