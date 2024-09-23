#! /usr/bin/env bash

set -e
set -x

# Let the DB start
python backend_pre_start.py

# Create initial data in DB
python initial_data.py