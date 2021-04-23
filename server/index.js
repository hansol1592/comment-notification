const { GraphQLServer, PubSub } = require("graphql-yoga");
const pubsub = new PubSub();

let chattingLog = [
  {
    id: 0,
    writer: "admin",
    description: "HELLO",
  },
];

const channelName = (writer) => {
  return `CHANNEL[${writer}]`;
};

const typeDefs = `
    type Chat {
      id: Int!
      writer: String!
      description: String!
    }
    type Query {
      chatting: [Chat]!
    }
    type Mutation {
        write(writer: String!, description: String!): String!
    }
    type Subscription {
        newChat(writer: String!): Chat
    }
`;
const resolvers = {
  Query: {
    chatting: () => {
      return chattingLog;
    },
  },
  Mutation: {
    write: (_, { writer, description }) => {
      const id = chattingLog.length;
      const newChat = {
        id,
        writer,
        description,
      };
      chattingLog.push(newChat);
      pubsub.publish(channelName(writer), {
        newChat,
      });
      return "YES";
    },
  },
  Subscription: {
    newChat: {
      subscribe: (_, { writer }, { pubsub }) =>
        pubsub.asyncIterator(channelName(writer)),
    },
  },
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: { pubsub },
});
server.start(() => console.log("Graphql Server Running"));
