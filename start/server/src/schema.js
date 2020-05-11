const {gql} = require('apollo-server');
const typeDefs = gql(`
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }
    """
    Simple wrapper around our list of launches that contains a cursor to the
    last item in the list. Pass this cursor to the launches query to fetch results
    after these.
    """
    type LaunchConnection {
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!         # not null, but can be empty array
    }
    
    type Rocket {
        id: ID!
        name: String
        type: String
    }
    
    type User {
        id: ID!
        email: String!          # must have value, but no a null
        trips: [Launch]!        # can be empty, but not null
    }
    
    type Mission {
        name: String
        missionPatch(mission:String, size: PatchSize):String
    }
    
    enum PatchSize {
        SMALL
        LARGE
    }
    
    type Query {
        """
        pageSize - The number of results to show. Must be >= 1. Default = 20
        after - If you add a cursor here, it will only return results _after_ this cursor
        """
        launches(pageSize: Int after:String): LaunchConnection!          
        launch(id: ID!):Launch
        me:User
    }
    
    type Mutation {
        bookTrips(launchIds: [ID]!):TripUpdateResponse!
        cancelTrip(launchId:ID!):TripUpdateResponse!
        login(email:String):String                      # login token
    }
    
    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }
    
`);

module.exports = typeDefs;