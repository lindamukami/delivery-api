const Koa = require("koa");
const Router = require("@koa/router");
const app = new Koa();
const router = new Router();

app.use(router.routes());

const deliveries = [
   {
      id: "1",
      pickupAddress: "1000 4th Ave, Seattle, WA, 98104",
      pickupPhoneNumber: "+14148928000",
      dropoffAddress: "1201 3rd Ave, Seattle, WA, 98101",
      dropoffPhoneNumber: "+14148928000",
      instructions: "",
      status: "CREATED",
   },
   {
      id: "2",
      pickupAddress: "1000 4th Ave, Seattle, WA, 98104",
      pickupPhoneNumber: "+14148915000",
      dropoffAddress: "1201 3rd Ave, Seattle, WA, 98101",
      dropoffPhoneNumber: "+14148915000",
      instructions: "",
      status: "CREATED",
   },
];

router.get("/deliveries", (ctx) => {
   ctx.body = {
      status: "00",
      message: "successs",
      data: deliveries,
   };
});

router.get("/deliveries/:id/select", (ctx) => {
   const id = ctx.params["id"];
   const delivery = deliveries.find((obj) => obj.id === id);
   if (!delivery) {
      ctx.body = {
         status: "01",
         message: "not found",
         data: null,
      };
   }
   ctx.body = {
      status: "00",
      message: "successs",
      data: { ...delivery, status: "QUEUED" },
   };
});

router.get("/deliveries/:id/confirm-pickup", (ctx) => {
   const id = ctx.params["id"];
   const delivery = deliveries.find((obj) => obj.id === id);
   if (!delivery) {
      ctx.body = {
         status: "01",
         message: "not found",
         data: null,
      };
   }
   ctx.body = {
      status: "00",
      message: "successs",
      data: { ...delivery, status: "PICKED_UP" },
   };
});

router.get("/deliveries/:id/complete", (ctx) => {
   const id = ctx.params["id"];
   const delivery = deliveries.find((obj) => obj.id === id);
   if (!delivery) {
      ctx.body = {
         status: "01",
         message: "not found",
         data: null,
      };
   }
   ctx.body = {
      status: "00",
      message: "successs",
      data: { ...delivery, status: "COMPLETED" },
   };
});

app.listen(8000);