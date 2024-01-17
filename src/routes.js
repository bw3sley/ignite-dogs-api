import { randomUUID } from "node:crypto";

import { Database } from "./database.js";

import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/dogs"),
        handler: (req, res) => {
            const { search } = req.query;

            const dogs = database.select("dogs", search ? {
                name: search,
                gender: search
            } : null);

            return res.end(JSON.stringify(dogs));
        }
    },

    {
        method: "POST",
        path: buildRoutePath("/dogs"),
        handler: (req, res) => {
            const { name, gender } = req.body;

            const dog = {
                id: randomUUID(),
                name,
                gender
            }

            database.insert("dogs", dog);

            return res.writeHead(201).end();
        }
    },

    {
        method: "PUT",
        path: buildRoutePath("/dogs/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const { name, gender } = req.body;

            database.update("dogs", id, {
                name,
                gender
            });

            return res.writeHead(204).end();
        }
    },

    {
        method: "DELETE",
        path: buildRoutePath("/dogs/:id"),
        handler: (req, res) => {
            const { id } = req.params;

            database.delete("dogs", id);

            return res.writeHead(204).end();
        }
    },
]