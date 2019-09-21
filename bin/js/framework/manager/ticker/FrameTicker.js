var FrameTicker = /** @class */ (function () {
    // ================================================================================================================
    // CONSTRUCTOR ----------------------------------------------------------------------------------------------------
    /**
     * Creates a new FrameTicker instance.
     */
    function FrameTicker() {
        this.listener = undefined;
        this.caller = undefined;
        this._onResume = new SimpleSignal();
        this._onPause = new SimpleSignal();
        this._onTick = new SimpleSignal();
        this._onTickOncePerFrame = new SimpleSignal();
    }
    FrameTicker.prototype.initialize = function (interval, maxTick) {
        this._timeScale = 1;
        this._currentTick = 0;
        this._currentTime = 0;
        this._tickDeltaTime = 0;
        this._maxTick = maxTick || 0;
        this._isRunning = false;
        this._isDisposed = false;
        this._maxInterval = NaN;
        this._minInterval = interval;
        this._onResume.removeAll();
        this._onPause.removeAll();
        this._onTick.removeAll();
        this._onTickOncePerFrame.removeAll();
    };
    // ================================================================================================================
    // PUBLIC INTERFACE -----------------------------------------------------------------------------------------------
    FrameTicker.prototype.updateOnce = function (callback) {
        callback(this.currentTimeSeconds, this.tickDeltaTimeSeconds, this.currentTick);
    };
    /**
     * Resumes running this instance, if it's in a paused state.
     *
     * <p>Calling this method when this instance is already running has no effect.</p>
     *
     * @see #isRunning
     */
    FrameTicker.prototype.resume = function () {
        if (!this._isRunning) {
            this._isRunning = true;
            this._lastTimeUpdated = this.getTimer();
            this._onResume.dispatch();
        }
    };
    /**
     * Pauses this instance, if it's in a running state. All time- and tick-related property values are also
     * paused.
     *
     * <p>Calling this method when this instance is already paused has no effect.</p>
     *
     * @see #isRunning
     */
    FrameTicker.prototype.pause = function () {
        if (this._isRunning) {
            this._isRunning = false;
            this._onPause.dispatch();
        }
    };
    /**
     * Prepares this instance for disposal, by pausing it and removing all signal callbacks.
     *
     * <p>Calling this method is not strictly necessary, but a good practice unless you're pausing it and
     * clearing all signals manually.</p>
     */
    FrameTicker.prototype.dispose = function () {
        this._isRunning = false;
        this._isDisposed = true;
        this._onResume.removeAll();
        this._onPause.removeAll();
        this._onTick.removeAll();
    };
    Object.defineProperty(FrameTicker.prototype, "currentTick", {
        // ================================================================================================================
        // ACCESSOR INTERFACE ---------------------------------------------------------------------------------------------
        /**
         * The index of the tick (an "internal frame") executed last.
         */
        get: function () {
            return this._currentTick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameTicker.prototype, "currentTimeSeconds", {
        /**
         * The current internal time of the looper, in seconds. This is aligned to the last tick executed.
         */
        get: function () {
            return this._currentTime / 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameTicker.prototype, "tickDeltaTimeSeconds", {
        /**
         * How much time has been spent between the last and the previous tick, in seconds.
         */
        get: function () {
            return this._tickDeltaTime / 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameTicker.prototype, "isDisposed", {
        get: function () {
            return this._isDisposed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameTicker.prototype, "timeScale", {
        /**
         * The time scale for the internal loop time. Changing this has an impact on the time used by the looper,
         * and can have the effect of make objects that depend on it slower or faster.
         *
         * <p>The actual number of signal callbacks dispatched per second do not change.</p>
         */
        get: function () {
            return this._timeScale;
        },
        /**
         * The time scale for the internal loop time. Changing this has an impact on the time used by the looper,
         * and can have the effect of make objects that depend on it slower or faster.
         *
         * <p>The actual number of signal callbacks dispatched per second do not change.</p>
         */
        set: function (value) {
            if (this._timeScale !== value) {
                this._timeScale = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameTicker.prototype, "onResume", {
        /**
         * A signal that sends callbacks for when the looper resumes running. Sends no parameters.
         *
         * <p>Usage:</p>
         *
         * <pre>
         * private function myonResume():void {
         *     trace("Looper has resumed");
         * }
         *
         * myFrameTicker.onResume.add(myonResume);
         * </pre>
         */
        get: function () {
            return this._onResume;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameTicker.prototype, "onPause", {
        /**
         * A signal that sends callbacks for when the looper pauses execution. Sends no parameters.
         *
         * <p>Usage:</p>
         *
         * <pre>
         * private function myonPause():void {
         *     trace("Looper has paused");
         * }
         *
         * myFrameTicker.onPause.add(myonPause);
         * </pre>
         */
        get: function () {
            return this._onPause;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameTicker.prototype, "onTick", {
        /**
         * A signal that sends callbacks for when the looper instance loops (that is, it "ticks"). It sends the
         * current time (absolute and delta, as seconds) and current tick (as an int) as parameters.
         *
         * <p>Usage:</p>
         *
         * <pre>
         * private function myonTick(currentTimeSeconds:Number, tickDeltaTimeSeconds:Number, currentTick:int):void {
         *     trace("A loop happened.");
         *     trace("Time since it started executing:" + currentTimeSeconds + " seconds");
         *     trace("           Time since last tick:" + tickDeltaTimeSeconds + " seconds");
         *     trace("        Tick/frame count so far:" + currentTick);
         * }
         *
         * myFrameTicker.onTick.add(myonTick);
         * </pre>
         */
        get: function () {
            return this._onTick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameTicker.prototype, "onTickOncePerFrame", {
        /**
         * A signal that sends callbacks for when the looper instance loops (that is, it "ticks") only once per
         * frame (basically ignoring the <code>minFPS</code> parameter). It sends the current time (absolute and
         * delta, as seconds) and current tick (as an int) as parameters.
         *
         * <p>This is useful when using <code>minFPS</code> because you can use the <code>onTick</code> callback
         * to do any state changes your game needs, but then only perform visual updates after a
         * <code>onTickOncePerFrame()</code> call. If you need to enforce a minimum number of frames per
         * second but did all visual updates on <code>onTick()</code>, you could potentially be repeating useless
         * visual updates.
         *
         * <p>Usage:</p>
         *
         * <pre>
         * private function myonTickOncePerFrame(currentTimeSeconds:Number, tickDeltaTimeSeconds:Number, currentTick:int):void {
         *     trace("At least one loop happened in this frame.");
         *     trace("Time since it started executing:" + currentTimeSeconds + " seconds");
         *     trace("           Time since last tick:" + tickDeltaTimeSeconds + " seconds");
         *     trace("        Tick/frame count so far:" + currentTick);
         * }
         *
         * myFrameTicker.onTickOncePerFrame.add(myonTickOncePerFrame);
         * </pre>
         */
        get: function () {
            return this._onTickOncePerFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameTicker.prototype, "isRunning", {
        /**
         * Returns <code>true</code> if the FrameTicker instance is running, <code>false</code> if it is paused.
         *
         * @see #pause()
         * @see #resume()
         */
        get: function () {
            return this._isRunning;
        },
        enumerable: true,
        configurable: true
    });
    // ================================================================================================================
    // EVENT INTERFACE ------------------------------------------------------------------------------------------------
    FrameTicker.prototype.onFrame = function () {
        if (!this._isRunning)
            return;
        this._now = this.getTimer();
        this._frameDeltaTime = this._now - this._lastTimeUpdated;
        if (isNaN(this._minInterval) || this._frameDeltaTime >= this._minInterval) {
            if (!isNaN(this._maxInterval)) {
                // Needs several updates
                this._interval = Math.min(this._frameDeltaTime, this._maxInterval);
                while (this._now >= this._lastTimeUpdated + this._interval) {
                    // Only dispatches visual frame update on the last call
                    this.update(this._interval * this._timeScale, this._now <= this._lastTimeUpdated + this._maxInterval * 2);
                    this._lastTimeUpdated += this._interval;
                }
            }
            else {
                // Just a single simple update
                this.update(this._frameDeltaTime * this._timeScale, true);
                this._lastTimeUpdated = this._now; // TODO: not perfect? drifting for ~1 frame every 20 seconds or so when minInterval is used
            }
        }
    };
    // ================================================================================================================
    // INTERNAL INTERFACE ---------------------------------------------------------------------------------------------
    FrameTicker.prototype.update = function (timePassedMS, newVisualFrame) {
        if (newVisualFrame === void 0) { newVisualFrame = true; }
        this._currentTick++;
        this._currentTime += timePassedMS;
        this._tickDeltaTime = timePassedMS;
        this._onTick.dispatch(this.currentTimeSeconds, this.tickDeltaTimeSeconds, this.currentTick);
        if (this._maxTick > 0 && this._currentTick >= this._maxTick) {
            this.dispose();
        }
        if (newVisualFrame)
            this._onTickOncePerFrame.dispatch(this.currentTimeSeconds, this.tickDeltaTimeSeconds, this.currentTick);
    };
    FrameTicker.prototype.getTimer = function () {
        return Date.now();
    };
    return FrameTicker;
}());
//# sourceMappingURL=FrameTicker.js.map