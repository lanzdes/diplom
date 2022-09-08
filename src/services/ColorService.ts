class ColorApiService {
  public TRANSPARENT = 'transparent';
  public WHITE = '#FFFFFF';
  public LIGHT = '#AFB2B6';
  public GRAPHITE = '#323537';
  public DARK = '#242426';
  public BLACK = '#000000';
  public PRIMARY = '#7B61FF';
  public PRIMARY_2 = '#917CFF';
  public SECONDARY = '#80858B';
  public ERROR = '#FF5154';
  public GREEN = '#00A340';
  public YELLOW = '#F3A608';
  public ORANGE = '#F45D2D';

  public getHexOpacity(value: number) {
    try {
      if (value > 1) value /= 100;
      let alpha16 = value.toString(16).split('.')[1].substr(0, 2);
      while (alpha16.length < 2) alpha16 += '0';
      return alpha16;
    } catch (error) {
      return 'FF';
    }
  }

  public hexToRGB(hex: string, alpha?: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }
}

export const ColorService = new ColorApiService();
