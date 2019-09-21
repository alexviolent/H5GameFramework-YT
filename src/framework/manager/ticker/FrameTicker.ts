type TickCallback = (currentTimeSeconds: number, tickDeltaTimeSeconds: number, currentTick: number) => void;

class FrameTicker {

	public listener: Function = undefined;
	public caller: any = undefined;

	// Properties
	private _isRunning: boolean;
	private _isDisposed: boolean;
	private _timeScale: number;
	private _currentTick: number;				// Current absolute frame (int)
	private _currentTime: number;				// Current absolute time, in ms (int)
	private _tickDeltaTime: number;				// Time since last tick, in ms (int)
	private _maxTick: number;

	private _lastTimeUpdated: number;			// int
	private _minInterval: number;				// Min time to wait (in ms) between updates; causes skips (NaN = never enforces)
	private _maxInterval: number;				// Max time to wait (in ms) between updates; causes repetitions (NaN = never enforces)

	// Temp stuff to reduce garbage collection
	private _now: number;						// uint
	private _frameDeltaTime: number;				// int
	private _interval: number;					// int

	// Instances
	private _onResume: SimpleSignal<() => void>;
	private _onPause: SimpleSignal<() => void>;
	private _onTick: SimpleSignal<TickCallback>;					// Fires the number of required fps
	private _onTickOncePerFrame: SimpleSignal<TickCallback>;		// Only fired once per visual frame

	// ================================================================================================================
	// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

	/**
	 * Creates a new FrameTicker instance.
	 */
	constructor() {
		this._onResume = new SimpleSignal<() => void>();
		this._onPause = new SimpleSignal<() => void>();
		this._onTick = new SimpleSignal<TickCallback>();
		this._onTickOncePerFrame = new SimpleSignal<TickCallback>();
	}

	public initialize(interval: number, maxTick?: number) {
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


	}


	// ================================================================================================================
	// PUBLIC INTERFACE -----------------------------------------------------------------------------------------------

	public updateOnce(callback: TickCallback): void {
		callback(this.currentTimeSeconds, this.tickDeltaTimeSeconds, this.currentTick);
	}

	/**
	 * Resumes running this instance, if it's in a paused state.
	 *
	 * <p>Calling this method when this instance is already running has no effect.</p>
	 *
	 * @see #isRunning
	 */
	public resume(): void {
		if (!this._isRunning) {
			this._isRunning = true;
			this._lastTimeUpdated = this.getTimer();
			this._onResume.dispatch();

		}
	}

	/**
	 * Pauses this instance, if it's in a running state. All time- and tick-related property values are also
	 * paused.
	 *
	 * <p>Calling this method when this instance is already paused has no effect.</p>
	 *
	 * @see #isRunning
	 */
	public pause(): void {
		if (this._isRunning) {
			this._isRunning = false;
			this._onPause.dispatch();
		}
	}

	/**
	 * Prepares this instance for disposal, by pausing it and removing all signal callbacks.
	 *
	 * <p>Calling this method is not strictly necessary, but a good practice unless you're pausing it and
	 * clearing all signals manually.</p>
	 */
	public dispose(): void {
		this._isRunning = false;
		this._isDisposed = true;
		this._onResume.removeAll();
		this._onPause.removeAll();
		this._onTick.removeAll();
	}

	// ================================================================================================================
	// ACCESSOR INTERFACE ---------------------------------------------------------------------------------------------

	/**
	 * The index of the tick (an "internal frame") executed last.
	 */
	public get currentTick(): number {
		return this._currentTick;
	}

	/**
	 * The current internal time of the looper, in seconds. This is aligned to the last tick executed.
	 */
	public get currentTimeSeconds(): number {
		return this._currentTime / 1000;
	}

	/**
	 * How much time has been spent between the last and the previous tick, in seconds.
	 */
	public get tickDeltaTimeSeconds(): number {
		return this._tickDeltaTime / 1000;
	}

	public get isDisposed(): boolean {
		return this._isDisposed;
	}

	/**
	 * The time scale for the internal loop time. Changing this has an impact on the time used by the looper,
	 * and can have the effect of make objects that depend on it slower or faster.
	 *
	 * <p>The actual number of signal callbacks dispatched per second do not change.</p>
	 */
	public get timeScale(): number {
		return this._timeScale;
	}

	/**
	 * The time scale for the internal loop time. Changing this has an impact on the time used by the looper,
	 * and can have the effect of make objects that depend on it slower or faster.
	 *
	 * <p>The actual number of signal callbacks dispatched per second do not change.</p>
	 */
	public set timeScale(value: number) {
		if (this._timeScale !== value) {
			this._timeScale = value;
		}
	}

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
	public get onResume() {
		return this._onResume;
	}

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
	public get onPause() {
		return this._onPause;
	}

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
	public get onTick() {
		return this._onTick;
	}

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
	public get onTickOncePerFrame() {
		return this._onTickOncePerFrame;
	}

	/**
	 * Returns <code>true</code> if the FrameTicker instance is running, <code>false</code> if it is paused.
	 *
	 * @see #pause()
	 * @see #resume()
	 */
	public get isRunning() {
		return this._isRunning;
	}


	// ================================================================================================================
	// EVENT INTERFACE ------------------------------------------------------------------------------------------------

	public onFrame(): void {
		if (!this._isRunning) return;

		this._now = this.getTimer();
		this._frameDeltaTime = this._now - this._lastTimeUpdated;

		if (isNaN(this._minInterval) || this._frameDeltaTime >= this._minInterval) {
			if (!isNaN(this._maxInterval)) {
				// Needs several updates
				this._interval = Math.min(this._frameDeltaTime, this._maxInterval);
				while (this._now >= this._lastTimeUpdated + this._interval) {
					// Only dispatches visual frame update on the last call
					this.update(
						this._interval * this._timeScale,
						this._now <= this._lastTimeUpdated + this._maxInterval * 2,
					);
					this._lastTimeUpdated += this._interval;
				}
			} else {
				// Just a single simple update
				this.update(this._frameDeltaTime * this._timeScale, true);
				this._lastTimeUpdated = this._now; // TODO: not perfect? drifting for ~1 frame every 20 seconds or so when minInterval is used
			}
		}

	}


	// ================================================================================================================
	// INTERNAL INTERFACE ---------------------------------------------------------------------------------------------

	private update(timePassedMS: number, newVisualFrame: boolean = true): void {
		this._currentTick++;
		this._currentTime += timePassedMS;
		this._tickDeltaTime = timePassedMS;
		this._onTick.dispatch(this.currentTimeSeconds, this.tickDeltaTimeSeconds, this.currentTick);

		if (this._maxTick > 0 && this._currentTick >= this._maxTick) {
			this.dispose();
		}

		if (newVisualFrame) this._onTickOncePerFrame.dispatch(this.currentTimeSeconds, this.tickDeltaTimeSeconds, this.currentTick);
	}

	private getTimer(): number {
		return Date.now();
	}
}
