class WordStackClockCard extends HTMLElement {
  static getStubConfig() {
    return {
      type: 'custom:word-stack-clock-card',
      language: 'en',
      use_24h: false,
      background: '#bdbdbd',
      text_color: '#101010',
      divider_color: '#101010',
      height: 340,
    };
  }

  static get styles() {
    return `
      :host {
        display: block;
      }

      ha-card {
        background: var(--clock-bg, #bdbdbd);
        color: var(--clock-text, #101010);
        border-radius: 18px;
        box-shadow: none;
        border: none;
      }

      .wrap {
        min-height: var(--clock-height, 340px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }

      .clock {
        display: flex;
        align-items: center;
        gap: 20px;
        transform: translateY(-4%);
      }

      .digits {
        position: relative;
        width: 186px;
        height: 150px;
      }

      .hour {
        position: absolute;
        left: -2px;
        top: 50%;
        transform: translateY(-49%);
        font-size: 128px;
        font-weight: 300;
        letter-spacing: -0.08em;
        line-height: 0.84;
        font-family: 'Bodoni Moda', 'Didot', 'Times New Roman', serif;
        text-rendering: geometricPrecision;
      }

      .min-top {
        position: absolute;
        right: 8px;
        top: -4px;
        font-size: 102px;
        font-weight: 300;
        letter-spacing: -0.08em;
        line-height: 0.84;
        font-family: 'Bodoni Moda', 'Didot', 'Times New Roman', serif;
        text-rendering: geometricPrecision;
      }

      .min-bottom {
        position: absolute;
        right: 7px;
        bottom: -10px;
        font-size: 102px;
        font-weight: 300;
        letter-spacing: -0.08em;
        line-height: 0.8;
        font-family: 'Bodoni Moda', 'Didot', 'Times New Roman', serif;
        text-rendering: geometricPrecision;
      }

      .divider {
        width: 1.5px;
        height: 124px;
        background: var(--clock-divider, #101010);
        opacity: 0.86;
      }

      .words {
        display: grid;
        gap: 7px;
        font-family: 'Montserrat', 'Avenir Next', 'Futura PT', sans-serif;
        font-size: 54px;
        line-height: 0.88;
        letter-spacing: 0.2em;
        font-weight: 500;
        text-transform: uppercase;
      }

      @media (max-width: 480px) {
        .wrap {
          min-height: 260px;
          padding: 16px;
        }

        .clock {
          gap: 11px;
        }

        .digits {
          width: 128px;
          height: 108px;
        }

        .hour {
          font-size: 84px;
        }

        .min-top,
        .min-bottom {
          font-size: 68px;
        }

        .divider {
          height: 86px;
        }

        .words {
          font-size: 30px;
          gap: 6px;
          letter-spacing: 0.16em;
        }
      }
    `;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._timer = null;
    this._time = new Date();
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Configurazione mancante');
    }
    this._config = {
      language: 'en',
      use_24h: false,
      background: '#bdbdbd',
      text_color: '#101010',
      divider_color: '#101010',
      height: 340,
      ...config,
    };
    this._render();
  }

  connectedCallback() {
    this._startClock();
  }

  disconnectedCallback() {
    this._stopClock();
  }

  set hass(_hass) {
    this._render();
  }

  getCardSize() {
    return 3;
  }

  _startClock() {
    this._stopClock();
    this._timer = setInterval(() => {
      this._time = new Date();
      this._render();
    }, 1000);
  }

  _stopClock() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  _digitToWord(d) {
    const dict = {
      en: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      it: ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove'],
    };
    const language = this._config.language === 'it' ? 'it' : 'en';
    return dict[language][Number(d)] || '';
  }

  _getTimeParts() {
    const now = new Date();
    const use24h = !!this._config.use_24h;
    let hour = now.getHours();

    if (!use24h) {
      hour = hour % 12;
      hour = hour === 0 ? 12 : hour;
    }

    const minute = String(now.getMinutes()).padStart(2, '0');
    const hourDigits = String(hour);

    return {
      hourDigits,
      minuteTens: minute[0],
      minuteOnes: minute[1],
    };
  }

  _render() {
    if (!this.shadowRoot) return;

    const { hourDigits, minuteTens, minuteOnes } = this._getTimeParts();
    const hourWord = hourDigits
      .split('')
      .map((d) => this._digitToWord(d))
      .join(' ');
    const minuteWord = `${this._digitToWord(minuteTens)} ${this._digitToWord(minuteOnes)}`;

    this.shadowRoot.innerHTML = `
      <style>${WordStackClockCard.styles}</style>
      <ha-card
        style="
          --clock-bg:${this._config.background};
          --clock-text:${this._config.text_color};
          --clock-divider:${this._config.divider_color};
          --clock-height:${Number(this._config.height)}px;
        "
      >
        <div class="wrap">
          <div class="clock">
            <div class="digits">
              <div class="hour">${hourDigits}</div>
              <div class="min-top">${minuteTens}</div>
              <div class="min-bottom">${minuteOnes}</div>
            </div>
            <div class="divider"></div>
            <div class="words">
              <div>${hourWord}</div>
              <div>${minuteWord}</div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
}

customElements.define('word-stack-clock-card', WordStackClockCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'word-stack-clock-card',
  name: 'Word Stack Clock Card',
  preview: true,
  description: 'Clock card with stacked minute digits and word rendering.',
});
