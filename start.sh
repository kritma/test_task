#!/bin/sh
scale="${1:-5}"
docker compose up --build --scale worker=$scale