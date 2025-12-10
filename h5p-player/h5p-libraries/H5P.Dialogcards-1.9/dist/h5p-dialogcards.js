(() => {
  "use strict";
  var r = H5P.jQuery,
    t = (function () {
      function t(t, e, a, i) {
        var s =
            arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
          n = arguments.length > 5 ? arguments[5] : void 0;
        return (
          (this.card = t),
          (this.params = e || {}),
          (this.id = a),
          (this.contentId = i),
          (this.callbacks = s),
          (this.$cardWrapper = r("<div>", {
            class: "h5p-dialogcards-cardwrap",
            role: "group",
            tabindex: "-1",
          })),
          this.$cardWrapper.addClass(
            "h5p-dialogcards-mode-" + this.params.mode
          ),
          "repetition" !== this.params.mode &&
            this.$cardWrapper.attr(
              "aria-labelledby",
              "h5p-dialogcards-progress-" + n
            ),
          (this.$cardHolder = r("<div>", {
            class: "h5p-dialogcards-cardholder",
          }).appendTo(this.$cardWrapper)),
          this.createCardContent(t).appendTo(this.$cardHolder),
          this
        );
      }
      var e = t.prototype;
      return (
        (e.createCardContent = function (t) {
          var e = r("<div>", { class: "h5p-dialogcards-card-content" });
          this.createCardImage(t).appendTo(e);
          var a = r("<div>", {
              class: "h5p-dialogcards-card-text-wrapper",
            }).appendTo(e),
            i = r("<div>", {
              class: "h5p-dialogcards-card-text-inner",
            }).appendTo(a),
            s = r("<div>", {
              class: "h5p-dialogcards-card-text-inner-content",
            }).appendTo(i);
          this.createCardAudio(t).appendTo(s);
          var n = r("<div>", { class: "h5p-dialogcards-card-text" }).appendTo(
            s
          );
          return (
            (this.$cardTextArea = r("<div>", {
              class: "h5p-dialogcards-card-text-area",
              tabindex: "-1",
              html: t.text,
            }).appendTo(n)),
            (t.text && t.text.length) || n.addClass("hide"),
            this.createCardFooter().appendTo(a),
            e
          );
        }),
        (e.massageAttributeOutput = function (r) {
          var t = new DOMParser().parseFromString(r, "text/html"),
            e = document.createElement("div");
          return (
            (e.innerHTML = t.documentElement.textContent),
            e.textContent || e.innerText || ""
          );
        }),
        (e.createCardImage = function (t) {
          this.$image;
          var e = r("<div>", { class: "h5p-dialogcards-image-wrapper" });
          return (
            void 0 !== t.image
              ? ((e = r("<div>", { class: "h5p-dialogcards-image-wrapper" })),
                (this.image = t.image),
                (this.$image = r(
                  '<img class="h5p-dialogcards-image" src="' +
                    H5P.getPath(t.image.path, this.contentId) +
                    '"/>'
                )),
                t.imageAltText &&
                  this.$image.attr(
                    "alt",
                    this.massageAttributeOutput(t.imageAltText)
                  ))
              : ((e = r("<div>", {
                  class: "h5p-dialogcards-image-wrapper-no-image",
                })),
                (this.$image = r('<div class="h5p-dialogcards-image"></div>'))),
            this.$image.appendTo(e),
            e
          );
        }),
        (e.createCardAudio = function (t) {
          if (
            (this.audio,
            (this.$audioWrapper = r("<div>", {
              class: "h5p-dialogcards-audio-wrapper",
            })),
            void 0 !== t.audio)
          ) {
            var e = {
              files: t.audio,
              audioNotSupported: this.params.audioNotSupported,
            };
            (this.audio = new H5P.Audio(e, this.contentId)),
              this.audio.attach(this.$audioWrapper),
              this.audio.audio &&
                this.audio.audio.preload &&
                (this.audio.audio.preload = "none");
          } else this.$audioWrapper.addClass("hide");
          return this.$audioWrapper;
        }),
        (e.createCardFooter = function () {
          var t = r("<div>", { class: "h5p-dialogcards-card-footer" }),
            e = "h5p-dialogcards-button-hidden",
            a = "-1";
          return (
            "repetition" === this.params.mode &&
              ((e = ""),
              this.params.behaviour.quickProgression &&
                ((e = "h5p-dialogcards-quick-progression"), (a = "0"))),
            (this.$buttonTurn = H5P.JoubelUI.createButton({
              class: "h5p-dialogcards-turn",
              html: this.params.answer,
            }).appendTo(t)),
            "repetition" === this.params.mode &&
              ((this.$buttonShowSummary = H5P.JoubelUI.createButton({
                class:
                  "h5p-dialogcards-show-summary h5p-dialogcards-button-gone",
                html: this.params.showSummary,
              }).appendTo(t)),
              (this.$buttonIncorrect = H5P.JoubelUI.createButton({
                class: "h5p-dialogcards-answer-button",
                html: this.params.incorrectAnswer,
              })
                .addClass("incorrect")
                .addClass(e)
                .attr("tabindex", a)
                .appendTo(t)),
              (this.$buttonCorrect = H5P.JoubelUI.createButton({
                class: "h5p-dialogcards-answer-button",
                html: this.params.correctAnswer,
              })
                .addClass("correct")
                .addClass(e)
                .attr("tabindex", a)
                .appendTo(t))),
            t
          );
        }),
        (e.createButtonListeners = function () {
          var r = this;
          this.$buttonTurn.unbind("click").click(function () {
            r.turnCard();
          }),
            "repetition" === this.params.mode &&
              (this.$buttonIncorrect.unbind("click").click(function (t) {
                t.target.classList.contains(
                  "h5p-dialogcards-quick-progression"
                ) && r.callbacks.onNextCard({ cardId: r.id, result: !1 });
              }),
              this.$buttonCorrect.unbind("click").click(function (t) {
                t.target.classList.contains(
                  "h5p-dialogcards-quick-progression"
                ) && r.callbacks.onNextCard({ cardId: r.id, result: !0 });
              }));
        }),
        (e.showSummaryButton = function (r) {
          this.getDOM()
            .find(".h5p-dialogcards-answer-button")
            .addClass("h5p-dialogcards-button-hidden")
            .attr("tabindex", "-1"),
            this.$buttonTurn.addClass("h5p-dialogcards-button-gone"),
            this.$buttonShowSummary
              .click(function () {
                return r();
              })
              .removeClass("h5p-dialogcards-button-gone")
              .focus();
        }),
        (e.hideSummaryButton = function () {
          "normal" !== this.params.mode &&
            (this.getDOM()
              .find(".h5p-dialogcards-answer-button")
              .removeClass("h5p-dialogcards-button-hidden")
              .attr("tabindex", "0"),
            this.$buttonTurn.removeClass("h5p-dialogcards-button-gone"),
            this.$buttonShowSummary
              .addClass("h5p-dialogcards-button-gone")
              .off("click"));
        }),
        (e.turnCard = function () {
          var r = this,
            t = this.getDOM(),
            e = t.find(".h5p-dialogcards-card-content"),
            a = t
              .find(".h5p-dialogcards-cardholder")
              .addClass("h5p-dialogcards-collapse");
          e.find(".joubel-tip-container").remove();
          var i = e.hasClass("h5p-dialogcards-turned");
          e.toggleClass("h5p-dialogcards-turned", !i),
            setTimeout(function () {
              if (
                (a.removeClass("h5p-dialogcards-collapse"),
                r.changeText(i ? r.getText() : r.getAnswer()),
                i
                  ? a.find(".h5p-audio-inner").removeClass("hide")
                  : r.removeAudio(a),
                "repetition" === r.params.mode &&
                  !r.params.behaviour.quickProgression)
              ) {
                var s = t.find(".h5p-dialogcards-answer-button");
                !1 === s.hasClass("h5p-dialogcards-quick-progression") &&
                  s
                    .addClass("h5p-dialogcards-quick-progression")
                    .attr("tabindex", 0);
              }
              setTimeout(function () {
                r.addTipToCard(e, i ? "front" : "back"),
                  "function" == typeof r.callbacks.onCardTurned &&
                    r.callbacks.onCardTurned(i);
              }, 200),
                r.resizeOverflowingText(),
                r.$cardTextArea.focus();
            }, 200);
        }),
        (e.changeText = function (r) {
          this.$cardTextArea.html(r),
            this.$cardTextArea.toggleClass("hide", !r || !r.length);
        }),
        (e.setProgressText = function (r, t) {
          if ("repetition" === this.params.mode) {
            var e = this.params.progressText
              .replace("@card", r.toString())
              .replace("@total", t.toString());
            this.$cardWrapper.attr("aria-label", e);
          }
        }),
        (e.resizeOverflowingText = function () {
          if (this.params.behaviour.scaleTextNotCard) {
            var r = this.getDOM().find(".h5p-dialogcards-card-text"),
              t = r.children();
            this.resizeTextToFitContainer(r, t);
          }
        }),
        (e.resizeTextToFitContainer = function (r, e) {
          e.css("font-size", "");
          var a = r.get(0).getBoundingClientRect().height,
            i = e.get(0).getBoundingClientRect().height,
            s = parseFloat(r.css("font-size")),
            n = parseFloat(e.css("font-size")),
            o = this.getDOM().closest(".h5p-container"),
            d = parseFloat(o.css("font-size"));
          if (i > a)
            for (var c = !0; c; ) {
              if ((n -= t.SCALEINTERVAL) < t.MINSCALE) {
                c = !1;
                break;
              }
              e.css("font-size", n / s + "em"),
                (i = e.get(0).getBoundingClientRect().height) <= a && (c = !1);
            }
          else
            for (var l = !0; l; ) {
              if ((n += t.SCALEINTERVAL) > d) {
                l = !1;
                break;
              }
              e.css("font-size", n / s + "em"),
                (i = e.get(0).getBoundingClientRect().height) >= a &&
                  ((l = !1),
                  (n -= t.SCALEINTERVAL),
                  e.css("font-size", n / s + "em"));
            }
        }),
        (e.addTipToCard = function (r, t, e) {
          "back" !== t && (t = "front"),
            void 0 === e && (e = this.id),
            r.find(".joubel-tip-container").remove();
          var a = this.card.tips;
          if (void 0 !== a && void 0 !== a[t]) {
            var i = a[t].trim();
            i.length &&
              r
                .find(
                  ".h5p-dialogcards-card-text-wrapper .h5p-dialogcards-card-text-inner"
                )
                .after(
                  H5P.JoubelUI.createTip(i, {
                    tipLabel: this.params.tipButtonLabel,
                  })
                );
          }
        }),
        (e.setCardFocus = function (r) {
          if (!0 === r) this.$cardTextArea.focus();
          else {
            var t = this.getDOM();
            t.one("transitionend", function () {
              t.focus();
            });
          }
        }),
        (e.stopAudio = function () {
          var r = this;
          if (this.audio && this.audio.audio) {
            var t = this.audio.audio.duration;
            t > 0 && t < Number.MAX_SAFE_INTEGER && this.audio.seekTo(t),
              this.audio.audio.load &&
                setTimeout(function () {
                  r.audio.audio.load();
                }, 100);
          }
        }),
        (e.removeAudio = function () {
          this.stopAudio(),
            this.getDOM().find(".h5p-audio-inner").addClass("hide");
        }),
        (e.getDOM = function () {
          return this.$cardWrapper;
        }),
        (e.getText = function () {
          return this.card.text;
        }),
        (e.getAnswer = function () {
          return this.card.answer;
        }),
        (e.getImage = function () {
          return this.$image;
        }),
        (e.getImageSize = function () {
          return this.image
            ? { width: this.image.width, height: this.image.height }
            : this.image;
        }),
        (e.getAudio = function () {
          return this.$audioWrapper;
        }),
        (e.reset = function () {
          var r = this.getDOM();
          r.removeClass("h5p-dialogcards-previous"),
            r.removeClass("h5p-dialogcards-current"),
            this.changeText(this.getText());
          var t = r.find(".h5p-dialogcards-card-content");
          t.removeClass("h5p-dialogcards-turned"),
            this.addTipToCard(t, "front", this.id),
            this.params.behaviour.quickProgression ||
              r
                .find(".h5p-dialogcards-answer-button")
                .removeClass("h5p-dialogcards-quick-progression"),
            this.hideSummaryButton();
        }),
        t
      );
    })();
  (t.SCALEINTERVAL = 0.2), (t.MAXSCALE = 16), (t.MINSCALE = 4);
  const e = t;
  const a = (function () {
    function r(r, t, e, a) {
      var i = this;
      return (
        (this.params = r),
        (this.contentId = t),
        (this.callbacks = e),
        (this.idCounter = a),
        (this.cards = []),
        this.params.dialogs.forEach(function (r, t) {
          (r.id = t), i.cards.push(t);
        }),
        this
      );
    }
    var t = r.prototype;
    return (
      (t.getCard = function (r) {
        if (!(r < 0 || r > this.cards.length))
          return (
            "number" == typeof this.cards[r] && this.loadCard(r), this.cards[r]
          );
      }),
      (t.getCardIds = function () {
        return this.cards.map(function (r, t) {
          return t;
        });
      }),
      (t.loadCard = function (r) {
        r < 0 ||
          r > this.cards.length ||
          ("number" == typeof this.cards[r] &&
            (this.cards[r] = new e(
              this.params.dialogs[r],
              this.params,
              r,
              this.contentId,
              this.callbacks,
              this.idCounter
            )));
      }),
      r
    );
  })();
  function i(r) {
    return (
      (function (r) {
        if (Array.isArray(r)) return s(r);
      })(r) ||
      (function (r) {
        if (
          ("undefined" != typeof Symbol && null != r[Symbol.iterator]) ||
          null != r["@@iterator"]
        )
          return Array.from(r);
      })(r) ||
      (function (r, t) {
        if (r) {
          if ("string" == typeof r) return s(r, t);
          var e = {}.toString.call(r).slice(8, -1);
          return (
            "Object" === e && r.constructor && (e = r.constructor.name),
            "Map" === e || "Set" === e
              ? Array.from(r)
              : "Arguments" === e ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
              ? s(r, t)
              : void 0
          );
        }
      })(r) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function s(r, t) {
    (null == t || t > r.length) && (t = r.length);
    for (var e = 0, a = Array(t); e < t; e++) a[e] = r[e];
    return a;
  }
  const n = (function () {
    function r() {
      var r =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
      return (
        (this.cards = r.filter(function (t, e) {
          return r.indexOf(t) >= e;
        })),
        this
      );
    }
    var t = r.prototype;
    return (
      (t.getCards = function () {
        return this.cards;
      }),
      (t.peek = function (r) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return (
          (t = Math.max(0, t)),
          "top" === r && (r = 0),
          "bottom" === r && (r = this.cards.length - t),
          r < 0 || r > this.cards.length - 1 ? [] : this.cards.slice(r, r + t)
        );
      }),
      (t.add = function (r) {
        var t = this,
          e =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : "top";
        "number" == typeof r && (r = [r]),
          r.forEach(function (a) {
            var s;
            -1 === t.cards.indexOf(a) &&
              ("top" === e
                ? (e = 0)
                : "bottom" === e
                ? (e = t.cards.length)
                : "random" === e &&
                  (e = Math.floor(Math.random() * t.cards.length)),
              (s = t.cards).splice.apply(s, [e, 0].concat(i(r))));
          });
      }),
      (t.push = function (r) {
        this.add(r, "top");
      }),
      (t.pull = function () {
        var r =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
          t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : "top";
        return (
          (r = Math.max(1, Math.min(r, this.cards.length))),
          "top" === t && (t = 0),
          "bottom" === t && (t = -r),
          (t = Math.max(0, Math.min(t, this.cards.length - 1))),
          this.cards.splice(t, r)
        );
      }),
      (t.remove = function (r) {
        var t = this;
        "number" == typeof r && (r = [r]),
          r.forEach(function (r) {
            var e = t.cards.indexOf(r);
            e > -1 && t.cards.splice(e, 1);
          });
      }),
      (t.shuffle = function () {
        for (var r = this.cards.length - 1; r > 0; r--) {
          var t = Math.floor(Math.random() * (r + 1)),
            e = [this.cards[t], this.cards[r]];
          (this.cards[r] = e[0]), (this.cards[t] = e[1]);
        }
        return this.cards;
      }),
      (t.contains = function (r) {
        return -1 !== this.cards.indexOf(r);
      }),
      (t.length = function () {
        return this.cards.length;
      }),
      r
    );
  })();
  function o(r) {
    return (
      (function (r) {
        if (Array.isArray(r)) return d(r);
      })(r) ||
      (function (r) {
        if (
          ("undefined" != typeof Symbol && null != r[Symbol.iterator]) ||
          null != r["@@iterator"]
        )
          return Array.from(r);
      })(r) ||
      (function (r, t) {
        if (r) {
          if ("string" == typeof r) return d(r, t);
          var e = {}.toString.call(r).slice(8, -1);
          return (
            "Object" === e && r.constructor && (e = r.constructor.name),
            "Map" === e || "Set" === e
              ? Array.from(r)
              : "Arguments" === e ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
              ? d(r, t)
              : void 0
          );
        }
      })(r) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function d(r, t) {
    (null == t || t > r.length) && (t = r.length);
    for (var e = 0, a = Array(t); e < t; e++) a[e] = r[e];
    return a;
  }
  const c = (function () {
    function r(r, t, e, i) {
      return (
        (this.params = r),
        (this.cardPool = new a(r, t, e, i)),
        this.reset(r.cardPiles),
        this
      );
    }
    var t = r.prototype;
    return (
      (t.createSelection = function () {
        var r = [];
        if ("repetition" === this.params.mode)
          r = this.createSelectionRepetition();
        else r = this.cardPool.getCardIds();
        return r;
      }),
      (t.createPiles = function (r) {
        if (r)
          this.cardPiles = r.map(function (r) {
            return new n(r.cards);
          });
        else {
          this.cardPiles = [];
          var t = this.cardPool.getCardIds();
          switch (this.params.mode) {
            case "repetition":
              for (var e = 0; e < this.params.behaviour.maxProficiency + 1; e++)
                0 === e
                  ? this.cardPiles.push(new n(t))
                  : this.cardPiles.push(new n());
              break;
            case "normal":
              this.cardPiles.push(new n(t));
          }
        }
      }),
      (t.updatePiles = function (r) {
        var t = this;
        return (
          r.forEach(function (r) {
            var e = t.find(r.cardId);
            if (-1 !== e) {
              var a = !0 === r.result ? e + 1 : 0;
              (a = Math.max(0, Math.min(a, t.cardPiles.length - 1))),
                t.cardPiles[e].remove(r.cardId),
                t.cardPiles[a].add(r.cardId, "bottom");
            }
          }),
          this.getPileSizes()
        );
      }),
      (t.createSelectionRepetition = function () {
        for (var r = [], t = null, e = 0; e < this.cardPiles.length - 1; e++) {
          var a,
            i = this.cardPiles[e].length();
          if (null !== t || 0 !== i) {
            null === t && (t = e);
            var s = Math.ceil((1 * i) / (1 + e - t)),
              n = this.cardPiles[e].peek(0, s);
            r = (a = r).concat.apply(a, o(n));
          }
        }
        return (r = this.shuffle(r));
      }),
      (t.shuffle = function (r) {
        for (var t = r.slice(), e = t.length - 1; e > 0; e--) {
          var a = Math.floor(Math.random() * (e + 1)),
            i = [t[a], t[e]];
          (t[e] = i[0]), (t[a] = i[1]);
        }
        return t;
      }),
      (t.find = function (r) {
        var t = -1;
        return (
          this.cardPiles.forEach(function (e, a) {
            if (-1 !== t) return t;
            e.contains(r) && (t = a);
          }),
          t
        );
      }),
      (t.reset = function (r) {
        this.createPiles(r);
      }),
      (t.getCard = function (r) {
        return this.cardPool.getCard(r);
      }),
      (t.getSize = function () {
        return this.cardPool.getCardIds().length;
      }),
      (t.getPiles = function () {
        return this.cardPiles;
      }),
      (t.getPileSizes = function () {
        return this.cardPiles.map(function (r) {
          return r.length();
        });
      }),
      r
    );
  })();
  const l = (function () {
    function r(r, t) {
      var e = this;
      (this.params = r),
        (this.callbacks = t),
        (this.currentCallback = t.nextRound),
        (this.fields = []),
        (this.container = document.createElement("div")),
        this.container.classList.add("h5p-dialogcards-summary-screen");
      var a = this.createContainerDOM(r.summary);
      (this.fields.round = a.getElementsByClassName(
        "h5p-dialogcards-summary-subheader"
      )[0]),
        (this.fields["h5p-dialogcards-round-cards-right"] = this.addTableRow(
          a,
          {
            category: this.params.summaryCardsRight,
            symbol: "h5p-dialogcards-check",
          }
        )),
        (this.fields["h5p-dialogcards-round-cards-wrong"] = this.addTableRow(
          a,
          {
            category: this.params.summaryCardsWrong,
            symbol: "h5p-dialogcards-times",
          }
        )),
        (this.fields["h5p-dialogcards-round-cards-not-shown"] =
          this.addTableRow(a, { category: this.params.summaryCardsNotShown }));
      var i = this.createContainerDOM(r.summaryOverallScore);
      (this.fields["h5p-dialogcards-overall-cards-completed"] =
        this.addTableRow(i, {
          category: this.params.summaryCardsCompleted,
          symbol: "h5p-dialogcards-check",
        })),
        (this.fields["h5p-dialogcards-overall-completed-rounds"] =
          this.addTableRow(i, {
            category: this.params.summaryCompletedRounds,
            symbol: "",
          }));
      var s = document.createElement("div");
      s.classList.add("h5p-dialogcards-summary-message"),
        (this.fields.message = s);
      var n = H5P.JoubelUI.createButton({
        class: "h5p-dialogcards-buttonNextRound",
        title: this.params.nextRound.replace("@round", 2),
        html: this.params.nextRound.replace("@round", 2),
      })
        .click(this.currentCallback)
        .get(0);
      this.fields.button = n;
      var o = H5P.JoubelUI.createButton({
          class: "h5p-dialogcards-button-restart",
          title: this.params.startOver,
          html: this.params.startOver,
        }).get(0),
        d = this.createConfirmationDialog(
          { l10n: this.params.confirmStartingOver, instance: this },
          function () {
            setTimeout(function () {
              e.callbacks.retry();
            }, 100);
          }
        );
      o.addEventListener("click", function (r) {
        d.show(r.target.offsetTop);
      }),
        (this.fields.buttonStartOver = o);
      var c = document.createElement("div");
      return (
        c.classList.add("h5p-dialogcards-summary-footer"),
        c.appendChild(o),
        c.appendChild(n),
        this.container.appendChild(a),
        this.container.appendChild(i),
        this.container.appendChild(s),
        this.container.appendChild(c),
        this.hide(),
        this
      );
    }
    var t = r.prototype;
    return (
      (t.getDOM = function () {
        return this.container;
      }),
      (t.createContainerDOM = function (r) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          e = document.createElement("div");
        e.classList.add("h5p-dialogcards-summary-container");
        var a = document.createElement("div");
        a.classList.add("h5p-dialogcards-summary-header"),
          (a.innerHTML = r),
          e.appendChild(a);
        var i = document.createElement("div");
        i.classList.add("h5p-dialogcards-summary-subheader"),
          (i.innerHTML = t),
          e.appendChild(i);
        var s = document.createElement("table");
        return (
          s.classList.add("h5p-dialogcards-summary-table"), e.appendChild(s), e
        );
      }),
      (t.addTableRow = function (r, t) {
        var e = r.getElementsByClassName("h5p-dialogcards-summary-table")[0],
          a = document.createElement("tr"),
          i = document.createElement("td");
        i.classList.add("h5p-dialogcards-summary-table-row-category"),
          (i.innerHTML = t.category),
          a.appendChild(i);
        var s = document.createElement("td");
        s.classList.add("h5p-dialogcards-summary-table-row-symbol"),
          void 0 !== t.symbol && "" !== t.symbol && s.classList.add(t.symbol),
          a.appendChild(s);
        var n = document.createElement("td");
        return (
          n.classList.add("h5p-dialogcards-summary-table-row-score"),
          a.appendChild(n),
          e.appendChild(a),
          n
        );
      }),
      (t.update = function () {
        var r = this,
          t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = t.done,
          a = void 0 !== e && e,
          i = t.round,
          s = void 0 === i ? void 0 : i,
          n = t.message,
          o = void 0 === n ? void 0 : n,
          d = t.results,
          c = void 0 === d ? [] : d;
        !0 === a
          ? (this.fields.buttonStartOver.classList.add(
              "h5p-dialogcards-button-gone"
            ),
            this.params.behaviour.enableRetry
              ? (this.fields.button.classList.remove(
                  "h5p-dialogcards-button-next-round"
                ),
                this.fields.button.classList.add(
                  "h5p-dialogcards-button-restart"
                ),
                (this.fields.button.innerHTML = this.params.retry),
                (this.fields.button.title = this.params.retry),
                (this.currentCallback = this.callbacks.retry))
              : this.fields.button.classList.add("h5p-dialogcards-button-gone"))
          : (this.fields.buttonStartOver.classList.remove(
              "h5p-dialogcards-button-gone"
            ),
            this.fields.button.classList.add(
              "h5p-dialogcards-button-next-round"
            ),
            this.fields.button.classList.remove(
              "h5p-dialogcards-button-restart"
            ),
            (this.fields.button.innerHTML = this.params.nextRound),
            (this.fields.button.title = this.params.nextRound),
            (this.currentCallback = this.callbacks.nextRound)),
          H5P.jQuery(this.fields.button)
            .unbind("click")
            .click(this.currentCallback),
          (this.fields.round.innerHTML = this.params.round.replace(
            "@round",
            s
          )),
          a ||
            void 0 === s ||
            ((this.fields.button.innerHTML = this.params.nextRound.replace(
              "@round",
              s + 1
            )),
            (this.fields.button.title = this.params.nextRound.replace(
              "@round",
              s + 1
            ))),
          a && void 0 !== o && "" !== o
            ? (this.fields.message.classList.remove("h5p-dialogcards-gone"),
              (this.fields.message.innerHTML = o))
            : this.fields.message.classList.add("h5p-dialogcards-gone"),
          c.forEach(function (t) {
            var e = void 0 !== t.score.value ? t.score.value : "";
            void 0 !== t.score.max &&
              (e = ""
                .concat(
                  e,
                  '&nbsp;<span class="h5p-dialogcards-summary-table-row-score-divider">/</span>&nbsp;'
                )
                .concat(t.score.max)),
              (r.fields[t.field].innerHTML = e);
          });
      }),
      (t.show = function () {
        var r = this;
        this.container.classList.remove("h5p-dialogcards-gone"),
          setTimeout(function () {
            r.fields.button.focus();
          }, 0);
      }),
      (t.hide = function () {
        this.container.classList.add("h5p-dialogcards-gone");
      }),
      (t.createConfirmationDialog = function (r, t) {
        r = r || {};
        var e = new H5P.ConfirmationDialog({
          instance: r.instance,
          headerText: r.l10n.header,
          dialogText: r.l10n.body,
          cancelText: r.l10n.cancelLabel,
          confirmText: r.l10n.confirmLabel,
        });
        return (
          e.on("confirmed", function () {
            t();
          }),
          e.appendTo(this.getContainer()),
          e
        );
      }),
      (t.getContainer = function () {
        var r = H5P.jQuery(
            '[data-content-id="' + self.contentId + '"].h5p-content'
          ),
          t = r.parents(".h5p-container");
        return (
          0 !== t.length
            ? t.last()
            : 0 !== r.length
            ? r
            : H5P.jQuery(document.body)
        ).get(0);
      }),
      r
    );
  })();
  function u(r) {
    if (void 0 === r)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return r;
  }
  function h(r, t) {
    return (
      (h = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (r, t) {
            return (r.__proto__ = t), r;
          }),
      h(r, t)
    );
  }
  var p = H5P.jQuery,
    g = H5P.JoubelUI,
    m = (function (r) {
      var t, e;
      function a(t, e, i) {
        var s;
        return (
          ((s = r.call(this) || this).idCounter = a.idCounter++),
          (s.contentId = s.id = e),
          (s.previousState = i.previousState || {}),
          (s.contentData = i || {}),
          (s.params = p.extend(
            {
              title: "",
              mode: "normal",
              description: "",
              next: "Next",
              prev: "Previous",
              retry: "Retry",
              answer: "Turn",
              correctAnswer: "I got it right!",
              incorrectAnswer: "I got it wrong",
              round: "Round @round",
              cardsLeft: "Cards left: @number",
              nextRound: "Proceed to round @round",
              startOver: "Start over",
              showSummary: "Next",
              summary: "Summary",
              summaryCardsRight: "Cards you got right:",
              summaryCardsWrong: "Cards you got wrong:",
              summaryCardsNotShown: "Cards in pool not shown:",
              summaryOverallScore: "Overall Score",
              summaryCardsCompleted: "Cards you have completed learning:",
              summaryCompletedRounds: "Completed rounds:",
              summaryAllDone:
                "Well done! You have mastered all @cards cards by getting them correct @max times!",
              progressText: "Card @card of @total",
              cardFrontLabel: "Card front",
              cardBackLabel: "Card back",
              tipButtonLabel: "Show tip",
              audioNotSupported: "Your browser does not support this audio",
              confirmStartingOver: {
                header: "Start over?",
                body: "All progress will be lost. Are you sure you want to start over?",
                cancelLabel: "Cancel",
                confirmLabel: "Start over",
              },
              dialogs: [
                { text: "Horse", answer: "Hest" },
                { text: "Cow", answer: "Ku" },
              ],
              behaviour: {
                enableRetry: !0,
                disableBackwardsNavigation: !1,
                scaleTextNotCard: !1,
                randomCards: !1,
                maxProficiency: 5,
                quickProgression: !1,
              },
            },
            t
          )),
          (s.cards = []),
          (s.currentCardId = 0),
          (s.round = 0),
          (s.results = s.previousState.results || []),
          (s.attach = function (r) {
            (s.$inner = r.addClass("h5p-dialogcards")),
              s.params.behaviour.scaleTextNotCard &&
                r.addClass("h5p-text-scaling");
            var t = {
              mode: s.params.mode,
              dialogs: s.params.dialogs,
              audioNotSupported: s.params.audioNotSupported,
              answer: s.params.answer,
              showSummary: s.params.showSummary,
              incorrectAnswer: s.params.incorrectAnswer,
              correctAnswer: s.params.correctAnswer,
              progressText: s.params.progressText,
              tipButtonLabel: s.params.tipButtonLabel,
              behaviour: {
                scaleTextNotCard: s.params.behaviour.scaleTextNotCard,
                maxProficiency: s.params.behaviour.maxProficiency,
                quickProgression: s.params.behaviour.quickProgression,
              },
              cardPiles: s.previousState.cardPiles,
            };
            (s.cardManager = new c(
              t,
              s.id,
              { onCardTurned: s.handleCardTurned, onNextCard: s.nextCard },
              s.idCounter
            )),
              s.createDOM(0 === s.round),
              void 0 !== s.previousState.currentCardId &&
                (s.gotoCard(s.previousState.currentCardId),
                "repetition" === s.params.mode &&
                  s.results.length === s.cardIds.length &&
                  s.showSummary(!0)),
              s.updateNavigation(),
              s.trigger("resize");
          }),
          (s.createDOM = function (r) {
            if (
              ((s.cardIds =
                r && s.previousState.cardIds
                  ? s.previousState.cardIds
                  : s.cardManager.createSelection()),
              (s.cardPoolSize = s.cardPoolSize || s.cardManager.getSize()),
              !0 === r)
            ) {
              var t = p("<div>" + s.params.title + "</div>")
                .text()
                .trim();
              (s.$header = p(
                (t
                  ? '<div class="h5p-dialogcards-title"><div class="h5p-dialogcards-title-inner">' +
                    s.params.title +
                    "</div></div>"
                  : "") +
                  '<div class="h5p-dialogcards-description">' +
                  s.params.description +
                  "</div>"
              )),
                (s.summaryScreen = new l(s.params, {
                  nextRound: s.nextRound,
                  retry: s.restartRepetition,
                }));
            }
            !0 === r
              ? (s.$cardwrapperSet = s.initCards(s.cardIds))
              : (s.$cardwrapperSet.detach(),
                (s.$cardwrapperSet = s.initCards(s.cardIds)),
                s.$cardSideAnnouncer.before(s.$cardwrapperSet)),
              s.$cardwrapperSet.prepend(s.summaryScreen.getDOM()),
              !0 === r &&
                ((s.$cardSideAnnouncer = p("<div>", {
                  html: s.params.cardFrontLabel,
                  class: "h5p-dialogcards-card-side-announcer",
                  "aria-live": "polite",
                })),
                (s.$footer = s.createFooter()),
                (s.$mainContent = p("<div>")
                  .append(s.$header)
                  .append(s.$cardwrapperSet)
                  .append(s.$cardSideAnnouncer)
                  .append(s.$footer)
                  .appendTo(s.$inner)),
                s.on("reset", function () {
                  this.reset();
                }),
                s.on("resize", s.resize),
                (s.round =
                  void 0 !== s.previousState.round
                    ? s.previousState.round
                    : 1));
          }),
          (s.createFooter = function () {
            var r = p("<nav>", {
                class: "h5p-dialogcards-footer",
                role: "navigation",
              }),
              t = function (r, t) {
                p(r).append('<span class="button-tooltip">' + t + "</span>"),
                  p(r).find(".button-tooltip").hide().fadeIn("fast");
              },
              e = function (r) {
                p(r).find(".button-tooltip").remove();
              };
            if ("normal" === s.params.mode) {
              var a = u(s);
              (s.$prev = g
                .createButton({
                  class:
                    "h5p-dialogcards-footer-button h5p-dialogcards-prev truncated",
                  "aria-label": s.params.prev,
                })
                .click(function () {
                  s.prevCard();
                })
                .appendTo(r)),
                s.$prev.hover(
                  function (r) {
                    t(a.$prev, a.params.prev);
                  },
                  function () {
                    e(a.$prev);
                  }
                ),
                (s.$next = g
                  .createButton({
                    class:
                      "h5p-dialogcards-footer-button h5p-dialogcards-next truncated",
                    "aria-label": s.params.next,
                  })
                  .click(function () {
                    s.nextCard();
                  })
                  .appendTo(r)),
                s.$next.hover(
                  function (r) {
                    t(a.$next, a.params.next);
                  },
                  function () {
                    e(a.$next);
                  }
                ),
                (s.$retry = g
                  .createButton({
                    class:
                      "h5p-dialogcards-footer-button h5p-dialogcards-retry h5p-dialogcards-disabled",
                    html: s.params.retry,
                  })
                  .click(function () {
                    s.trigger("reset");
                  })
                  .appendTo(r)),
                s.$retry.hover(
                  function (r) {
                    t(a.$retry, a.params.retry);
                  },
                  function () {
                    e(a.$retry);
                  }
                ),
                (s.$progress = p("<div>", {
                  id: "h5p-dialogcards-progress-" + s.idCounter,
                  class: "h5p-dialogcards-progress",
                  "aria-live": "assertive",
                }).appendTo(r));
            } else
              (s.$round = p("<div>", {
                class: "h5p-dialogcards-round",
              }).appendTo(r)),
                (s.$progress = p("<div>", {
                  class: "h5p-dialogcards-cards-left",
                  "aria-live": "assertive",
                }).appendTo(r));
            return r;
          }),
          (s.updateImageSize = function () {
            var r = 0,
              t = s.cards[s.currentCardId]
                .getDOM()
                .find(".h5p-dialogcards-card-content");
            if (
              (s.params.dialogs.forEach(function (e) {
                if (e.image) {
                  var a =
                    (e.image.height / e.image.width) *
                    t.get(0).getBoundingClientRect().width;
                  a > r && (r = a);
                }
              }),
              r > 0)
            ) {
              var e = r / parseFloat(s.$inner.css("font-size"));
              e > 15 && (e = 15),
                s.cards.forEach(function (r) {
                  r.getImage()
                    .parent()
                    .css("height", e + "em");
                });
            }
          }),
          (s.initCards = function (r) {
            (s.cards = []),
              (s.currentCardId = 0),
              s.params.behaviour.randomCards && (r = H5P.shuffleArray(r));
            for (
              var t = p("<div>", { class: "h5p-dialogcards-cardwrap-set" }),
                e = 0;
              e < r.length && !(e >= 2);
              e++
            ) {
              var a = s.getCard(r[e]);
              a.setProgressText(e + 1, r.length), s.cards.push(a);
              var i = a.getDOM();
              e === s.currentCardId &&
                (i.addClass("h5p-dialogcards-current"), (s.$current = i)),
                a.addTipToCard(
                  i.find(".h5p-dialogcards-card-content"),
                  "front",
                  e
                ),
                t.append(i);
            }
            return t;
          }),
          (s.handleCardTurned = function (r) {
            s.$cardSideAnnouncer.html(
              r ? s.params.cardFrontLabel : s.params.cardBackLabel
            ),
              s.params.behaviour.enableRetry &&
                s.currentCardId + 1 === s.cardIds.length &&
                s.$retry &&
                (s.$retry.removeClass("h5p-dialogcards-disabled"),
                s.truncateRetryButton());
          }),
          (s.updateNavigation = function () {
            if ("normal" === s.params.mode)
              s.getCurrentSelectionIndex() < s.cardIds.length - 1
                ? (s.$next.removeClass("h5p-dialogcards-disabled"),
                  s.$retry.addClass("h5p-dialogcards-disabled"))
                : s.$next.addClass("h5p-dialogcards-disabled"),
                s.currentCardId > 0 &&
                !s.params.behaviour.disableBackwardsNavigation
                  ? s.$prev.removeClass("h5p-dialogcards-disabled")
                  : s.$prev.addClass("h5p-dialogcards-disabled"),
                s.$progress.text(
                  s.params.progressText
                    .replace("@card", s.getCurrentSelectionIndex() + 1)
                    .replace("@total", s.cardIds.length)
                ),
                s.cards[
                  s.findCardPosition(s.cards[s.currentCardId].id)
                ].resizeOverflowingText();
            else {
              s.$round.text(s.params.round.replace("@round", s.round));
              var r = s.getCurrentSelectionIndex();
              s.$progress.text(
                s.params.cardsLeft.replace("@number", s.cardIds.length - r)
              );
            }
            s.trigger("resize");
          }),
          (s.showSummary = function () {
            var r =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                  ? s.cardManager.getPileSizes()
                  : s.cardManager.updatePiles(s.results),
              t = s.results.filter(function (r) {
                return !0 === r.result;
              }).length,
              e = s.results.length - t,
              a = s.cardPoolSize - t - e,
              i = r.slice(-1)[0],
              n = i === s.cardPoolSize,
              o = {
                round: s.round,
                results: [
                  {
                    field: "h5p-dialogcards-round-cards-right",
                    score: { value: t, max: e + t },
                  },
                  {
                    field: "h5p-dialogcards-round-cards-wrong",
                    score: { value: e, max: e + t },
                  },
                  {
                    field: "h5p-dialogcards-round-cards-not-shown",
                    score: { value: a },
                  },
                  {
                    field: "h5p-dialogcards-overall-cards-completed",
                    score: { value: i, max: s.cardPoolSize },
                  },
                  {
                    field: "h5p-dialogcards-overall-completed-rounds",
                    score: { value: s.round },
                  },
                ],
              };
            n &&
              ((o.done = !0),
              (o.message = s.params.summaryAllDone
                .replace("@cards", s.cardPoolSize)
                .replace("@max", s.params.behaviour.maxProficiency))),
              s.summaryScreen.update(o),
              s.summaryScreen.show(),
              s.hideCards(),
              s.trigger("resize");
          }),
          (s.showCards = function () {
            s.$cardwrapperSet
              .find(".h5p-dialogcards-cardwrap")
              .removeClass("h5p-dialogcards-gone"),
              s.$footer.removeClass("h5p-dialogcards-gone"),
              (s.cardsShown = !0);
          }),
          (s.hideCards = function () {
            s.$cardwrapperSet
              .find(".h5p-dialogcards-cardwrap")
              .addClass("h5p-dialogcards-gone"),
              s.$footer.addClass("h5p-dialogcards-gone"),
              (s.cardsShown = !1);
          }),
          (s.nextCard = function (r) {
            void 0 !== r && s.results.push(r),
              s.cards[s.currentCardId].stopAudio(),
              s.cardIds.length - s.getCurrentSelectionIndex() != 1
                ? s.gotoCard(s.getCurrentSelectionIndex() + 1)
                : "repetition" === s.params.mode &&
                  (s.$progress.text(s.params.cardsLeft.replace("@number", 0)),
                  s.cards[s.currentCardId].showSummaryButton(s.showSummary));
          }),
          (s.getCard = function (r) {
            var t = s.cardManager.getCard(r);
            return t.createButtonListeners(), t;
          }),
          (s.findCardPosition = function (r) {
            var t;
            return (
              s.cards.forEach(function (e, a) {
                t || e.id !== r || (t = a);
              }),
              t
            );
          }),
          (s.insertCardToDOM = function (r, t) {
            var e = r.getDOM();
            void 0 === t
              ? e.appendTo(s.$cardwrapperSet)
              : 0 === t
              ? s.$cardwrapperSet.prepend(e)
              : s.$cardwrapperSet.children().eq(t).after(e),
              r.addTipToCard(
                e.find(".h5p-dialogcards-card-content"),
                "front",
                t
              );
          }),
          (s.gotoCard = function (r) {
            if (!(r < 0 || r >= s.cardIds.length)) {
              var t = s.cards[s.currentCardId];
              t.stopAudio(), t.getDOM().removeClass("h5p-dialogcards-current");
              var e = [];
              r > 0 && e.push(r - 1),
                e.push(r),
                r + 1 < s.cardIds.length && e.push(r + 1),
                e.forEach(function (r) {
                  if (void 0 === s.findCardPosition(s.cardIds[r])) {
                    var t = s.getCard(s.cardIds[r]);
                    t.setProgressText(r + 1, s.cardIds.length);
                    var e = Math.min(r + 1, s.cardIds.length - 1),
                      a = s.findCardPosition(s.cardIds[e]) || s.cards.length;
                    s.cards.splice(a, 0, t), s.insertCardToDOM(t, a);
                  }
                }),
                s.resize(),
                (r = s.findCardPosition(s.cardIds[r])),
                s.cards.forEach(function (t, e) {
                  e < r
                    ? t.getDOM().addClass("h5p-dialogcards-previous")
                    : (t.getDOM().removeClass("h5p-dialogcards-previous"),
                      e === r &&
                        t.getDOM().addClass("h5p-dialogcards-current"));
                }),
                (s.currentCardId = r),
                s.updateNavigation(),
                s.cards[s.currentCardId].setCardFocus();
            }
          }),
          (s.prevCard = function () {
            s.gotoCard(s.getCurrentSelectionIndex() - 1);
          }),
          (s.showAllAudio = function () {
            s.$cardwrapperSet.find(".h5p-audio-inner").removeClass("hide");
          }),
          (s.restartRepetition = function () {
            s.cardManager.reset(), (s.round = 0), s.nextRound();
          }),
          (s.nextRound = function () {
            var r =
              !(arguments.length > 0 && void 0 !== arguments[0]) ||
              arguments[0];
            s.round++,
              s.summaryScreen.hide(),
              s.showCards(),
              s.reset(),
              s.createDOM(),
              s.updateNavigation(),
              (s.isRoot() || r) && s.cards[s.currentCardId].setCardFocus(!0),
              s.trigger("resize");
          }),
          (s.reset = function () {
            (s.results = []),
              s.cards[s.currentCardId].stopAudio(s.$current.index()),
              s.cards.forEach(function (r) {
                r.reset();
              }),
              (s.currentCardId = 0),
              "normal" === s.params.mode &&
                s.cards[s.currentCardId]
                  .getDOM()
                  .addClass("h5p-dialogcards-current"),
              s.updateNavigation(),
              s.$retry && s.$retry.addClass("h5p-dialogcards-disabled"),
              s.showAllAudio(),
              s.cards[s.currentCardId].resizeOverflowingText(),
              s.cards[s.currentCardId].setCardFocus();
          }),
          (s.resize = function () {
            var r = 0;
            s.updateImageSize(),
              s.params.behaviour.scaleTextNotCard ||
                !1 === s.cardsShown ||
                s.determineCardSizes(),
              s.$cardwrapperSet.css("height", "auto"),
              s.$cardwrapperSet
                .children(":not(.h5p-dialogcards-gone)")
                .each(function () {
                  var t = p(this).css("height", "initial").outerHeight();
                  if (
                    (p(this).css("height", "inherit"),
                    (r = t > r ? t : r),
                    !p(this).next(".h5p-dialogcards-cardwrap").length)
                  ) {
                    var e = p(this)
                      .find(".h5p-dialogcards-cardholder")
                      .css("height", "initial")
                      .outerHeight();
                    (r = e > r ? e : r),
                      p(this)
                        .find(".h5p-dialogcards-cardholder")
                        .css("height", "inherit");
                  }
                });
            var t = r / parseFloat(s.$cardwrapperSet.css("font-size"));
            s.$cardwrapperSet.css("height", t + "em"),
              s.scaleToFitHeight(),
              s.truncateRetryButton(),
              s.cards[s.currentCardId].resizeOverflowingText();
          }),
          (s.determineCardSizes = function () {
            var r = u(s);
            void 0 === s.cardSizeDetermined && (s.cardSizeDetermined = []),
              s.$cardwrapperSet.children(":visible").each(function (t) {
                var e = r.cards[t].id;
                if (-1 === r.cardSizeDetermined.indexOf(e)) {
                  r.cardSizeDetermined.push(e);
                  var a = p(".h5p-dialogcards-card-content", this),
                    i = p(".h5p-dialogcards-card-text-inner-content", a),
                    s = i[0].getBoundingClientRect().height,
                    n = r.cards[t];
                  n.changeText(n.getAnswer());
                  var o = i[0].getBoundingClientRect().height,
                    d = s > o ? s : o,
                    c = parseFloat(i.parent().parent().css("minHeight"));
                  d < c && (d = c),
                    (d /= parseFloat(a.css("fontSize"))),
                    i.parent().css("height", d + "em"),
                    n.changeText(n.getText());
                }
              });
          }),
          (s.scaleToFitHeight = function () {
            if (
              s.$cardwrapperSet &&
              s.$cardwrapperSet.is(":visible") &&
              s.params.behaviour.scaleTextNotCard
            )
              if (s.$inner.parents(".h5p-course-presentation").length) {
                var r = s.$inner.parent();
                s.$inner.parents(".h5p-popup-container").length &&
                  (r = s.$inner.parents(".h5p-popup-container"));
                var t = r.get(0).getBoundingClientRect().height,
                  e = function () {
                    var r = 0;
                    return (
                      s.$inner.children().each(function () {
                        var t = p(this);
                        r +=
                          this.getBoundingClientRect().height +
                          parseFloat(t.css("margin-top")) +
                          parseFloat(t.css("margin-bottom"));
                      }),
                      r
                    );
                  },
                  i = e(),
                  n = parseFloat(s.$inner.parent().css("font-size")),
                  o = parseFloat(s.$inner.css("font-size"));
                if (t < i)
                  for (; t < i && !((o -= a.SCALEINTERVAL) < a.MINSCALE); )
                    s.$inner.css("font-size", o / n + "em"), (i = e());
                else
                  for (var d = !0; d; ) {
                    if ((o += a.SCALEINTERVAL) > a.MAXSCALE) {
                      d = !1;
                      break;
                    }
                    var c = o / n;
                    s.$inner.css("font-size", c + "em"),
                      t <= (i = e()) &&
                        ((d = !1),
                        (c = (o - a.SCALEINTERVAL) / n),
                        s.$inner.css("font-size", c + "em"));
                  }
              } else s.cards[s.currentCardId].resizeOverflowingText();
          }),
          (s.truncateRetryButton = function () {
            if (s.$retry) {
              s.$retry.removeClass("truncated"), s.$retry.html(s.params.retry);
              (s.$retry.get(0).getBoundingClientRect().width +
                parseFloat(s.$retry.css("margin-left")) +
                parseFloat(s.$retry.css("margin-right"))) /
                s.$retry.parent().get(0).getBoundingClientRect().width >
                0.3 && (s.$retry.addClass("truncated"), s.$retry.html(""));
            }
          }),
          (s.getCurrentSelectionIndex = function () {
            return s.cardIds.indexOf(s.cards[s.currentCardId].id);
          }),
          (s.getTitle = function () {
            return H5P.createTitle(
              s.contentData &&
                s.contentData.metadata &&
                s.contentData.metadata.title
                ? s.contentData.metadata.title
                : "Dialog Cards"
            );
          }),
          (s.getCurrentState = function () {
            if (s.cardManager)
              return s.isProgressStarted()
                ? {
                    cardPiles: s.cardManager.getPiles(),
                    cardIds: s.cardIds,
                    round: s.round,
                    currentCardId: s.getCurrentSelectionIndex(),
                    results: s.results,
                  }
                : void 0;
          }),
          (s.isProgressStarted = function () {
            return (
              !H5P.isEmpty(s.previousState) ||
              0 !== s.getCurrentSelectionIndex() ||
              0 !== s.results.length ||
              1 !== s.round
            );
          }),
          (s.resetTask = function () {
            var r =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            s.cardManager &&
              ((s.previousState = {}), (s.round = 0), s.nextRound(r));
          }),
          s
        );
      }
      return (
        (e = r),
        ((t = a).prototype = Object.create(e.prototype)),
        (t.prototype.constructor = t),
        h(t, e),
        a
      );
    })(H5P.EventDispatcher);
  (m.idCounter = 0),
    (m.SCALEINTERVAL = 0.2),
    (m.MAXSCALE = 16),
    (m.MINSCALE = 4);
  const f = m;
  H5P.Dialogcards = f;
})();
