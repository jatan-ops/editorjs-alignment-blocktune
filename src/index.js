/**
 * Build styles
 */
require('./index.css').toString();
const {make} = require('./util');

class AlignmentBlockTune {

    static get isTune() {
        return true;
    }

    /**
     *
     * @param api
     * @param data 既に設定されているデータ
     * @param settings tuneに設定項目
     * @param block tuneに設定されてるblock
     */
    constructor({ api, data, config, block}) {
        this.api = api;
        this.block = block;
        this.settings = config;
        this.data = data || { alignment: false }
    }

    /**
     * block自体をwrapしてくれる
     * constructorで与えられたalignmentを代入しようとすると、holderが確定してなく
     * renderでやろうとすると、tuneを表示時に処理が走る
     * @param blockContent
     */
    wrap(blockContent) {
        this.wrapper = make("div");
        this.wrapper.append(blockContent)    
        if(this.data.alignment) {
            this.wrapper.classList.toggle('ce-tune-alignment--center')
        }    
        blockContent.addEventListener('keyup',(e) => {
            if(e.altKey && e.key === 'i') {                
                const toggle = this.wrapper.classList.toggle('ce-tune-alignment--center')
                this.data = {
                    alignment: toggle
                }
            }
        })
        return this.wrapper
    }

    /**
     * rendering block tune
     * @returns {*}
     */
    render() {
        return null;
    }
    /**
     * save
     * @returns {*}
     */
    save() {
        return this.data;
    }
}

module.exports = AlignmentBlockTune;
