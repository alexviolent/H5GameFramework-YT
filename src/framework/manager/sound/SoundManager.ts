/*
 * Created at Sat Aug 03 2019 by clh
 * Contact <395942144@qq.com>
 *
 * The MIT License (MIT)
 * Copyright (c) 2019 clh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

namespace core {
    class SoundManager extends Singleton {
        /** 声音播放器 */
        private musicPlayer: BaseSoundPlayer = new MusicPlayer;
        private effectPlayer: BaseSoundPlayer = new EffectPlayer;

        /** 是否静音 */
        private mute: boolean = false;

        public setMute(mute: boolean) {
            this.mute = mute;

            if (mute) {
                this.musicPlayer.stopSound();
                this.effectPlayer.stopSound();
            } else {
                this.musicPlayer.playSound();
            }
        }

        public isMute(): boolean {
            return this.mute;
        }

        playMusic(url:string) {
            if (this.mute) {
                return;
            }

            this.musicPlayer.playSound(url);
        }

        private playSound(url: string) {
            if (this.mute) {
                return;
            }

            this.effectPlayer.playSound(url);
        }



    }

    export const SoundMgr = new SoundManager;
}
