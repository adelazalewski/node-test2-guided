
const request = require("supertest")
const server = require("../server")
const db = require("../data/config")

// afterAll(async () => {
//     await db.destroy() //closes the db connections
// })
beforeEach(async() => {
    await db.seed.run()
})
describe("hobbits integration tests", () => {
    test("get /hobbits", async() =>{
        const res = await request(server).get("/hobbits")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBe(4)
        expect(res.body[0].name).toBe("sam")
    })

    it("gets a hobbit by id", async () => {
        const res = await request(server).get("/hobbits/2")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.id).toBe(2)
        expect(res.body.name).toBe("frodo")
    })
    it("returns a 404 if hobbit not found", async ( ) => {
        const res = await request(server).get("/hobbits/50")
        expect(res.statusCode).toBe(404)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("hobbit not found")
    })
    it("creates a hobbit", async( ) => {
        const res = await request(server)
        .post("/hobbits")
        .send({name: "adela z"})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body.name).toBe("adela z")
    })
})