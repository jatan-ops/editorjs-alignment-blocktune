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
        blockContent.addEventListener('keydown',(e) => {
            if(e.key === 'Tab') {                            
                e.preventDefault()
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
        const wrapper = make("div");

        const button = document.createElement('button');
        button.classList.add(this.api.styles.settingsButton)
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-justify" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>'
        button.type = 'button';

        button.classList.toggle(this.api.styles.settingsButtonActive,this.data.alignment);

        button.addEventListener('click',() => {
            const toggle = this.wrapper.classList.toggle('ce-tune-alignment--center')
            this.data = {
                alignment: toggle
            }            
            button.classList.toggle(this.api.styles.settingsButtonActive, this.data.alignment);
        })

        wrapper.appendChild(button);
        return wrapper
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
