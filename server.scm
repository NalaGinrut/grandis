#!/usr/env guile
!#

(use-modules (artanis artanis))

(init-server)

(get "/test"
  (lambda () "hello world"))

(run)
