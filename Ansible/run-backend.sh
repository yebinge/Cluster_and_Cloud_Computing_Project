#!/usr/bin/env bash

ansible-playbook -i inventory/hosts.ini -u ubuntu --key-file=/Users/QAQ/ccc-project/group-8.pem backend.yaml