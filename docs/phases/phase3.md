# Phase 3: Projects and Files Comments, Explanations, Suggestions, Votes (2 days)

## Rails
### Models
* Reply
* Explanation
* Votes

### Controllers
* Api::RepliesController (create, destroy, index, show, update)
* Api::VotesController (create, destroy, index, show, update)

### Views
* replies/index.json.jbuilder
* replies/show.json.jbuilder
* votes/index.json.jbuilder
* votes/show.json.jbuilder

## Flux
### Views (React Components)
* RepliesIndex
  - ReplyIndexItem
* ReplyForm
* VoteForm
* SearchIndex

### Actions
* ApiActions.receiveAllReplies -> triggered by ApiUtil
* ApiActions.receiveSingleReply
* ApiActions.deleteReply
* ReplyActions.fetchAllReplies -> triggers ApiUtil
* ReplyActions.fetchSingleReply
* ReplyActions.createReply
* ReplyActions.editReply
* ReplyActions.destroyReply

* ApiActions.receiveAllVotes -> triggered by ApiUtil
* ApiActions.receiveSingleVote
* ApiActions.deleteVote
* VoteActions.fetchAllVotes -> triggers ApiUtil
* VoteActions.fetchSingleVote
* VoteActions.createVote
* VoteActions.editVote
* VoteActions.destroyVote

### ApiUtil
* ApiUtil.fetchAllReplies
* ApiUtil.fetchSingleReply
* ApiUtil.createReply
* ApiUtil.editReply
* ApiUtil.destroyReply

* ApiUtil.fetchAllVotes
* ApiUtil.fetchSingleVote
* ApiUtil.createVote
* ApiUtil.editVote
* ApiUtil.destroyVote

## Gems/Libraries
