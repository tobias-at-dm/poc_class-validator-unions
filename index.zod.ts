import z from "zod";

const addToCartEvent = z.object({
    type: z.literal("addToCart"),
    product: z.string().min(8)
});

const dummyEvent = z.object({
    type: z.literal("dummy"),
    dummy: z.string().min(1)
});

const event = z.union([addToCartEvent, dummyEvent]);

export type AddToCartEvet = z.infer<typeof addToCartEvent>;
export type DummyEvent = z.infer<typeof dummyEvent>;
export type Event = z.infer<typeof event>;

const invalidDummy: DummyEvent = { type: "dummy", dummy: "" };
const invalidEvent: Event = JSON.parse(JSON.stringify(invalidDummy));

try {
    event.parse(invalidEvent);
    console.log("invalidEvent is valid");
} catch (e: any) {
    console.log("invalidEvent", e.errors);
}