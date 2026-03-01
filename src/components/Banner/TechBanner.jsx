import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import './TechBanner.css';

const TechBanner = () => {
  const carouselRef = useRef(null);
  const bannerRef = useRef(null);

  // Technologies whit SVG icons
  const technologies = [
    {
      name: 'HTML',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
          <path d="M1.5 2.5l2 20L12 24.5l8.5-2 2-20H1.5zM18.5 7.5h-13l.5 5h12l-.5 5-6.5 2-6.5-2-.5-3h3l.25 1.5L12 16l4.25-1L16.5 13h-9l-1-10h13l-.5 2.5z"/>
        </svg>
      )
    },
    {
      name: 'CSS',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
          <path d="M1.5 2.5l2 20L12 24.5l8.5-2 2-20H1.5zM18.5 7.5h-13l.5 5h12l-.5 5-6.5 2-6.5-2-.5-3h3l.25 1.5L12 16l4.25-1L16.5 13h-9l-1-10h13l-.5 2.5z"/>
        </svg>
      )
    },
    {
      name: 'SCSS',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zM9.6 16.8c-.6 1.2-1.4 2.2-2.4 2.8-.6.4-1.2.6-1.8.4-.4-.2-.6-.8-.4-1.6.2-.8.8-1.8 1.4-2.6.8-1 1.8-1.8 2.8-2.4l.4-.2v3.6zm6.8-5.2c-.8 0-1.4.2-1.8.6-.6.6-.8 1.4-.4 2.2.2.4.6.8 1 1 .6.4 1.2.6 1.8.6.8 0 1.4-.2 1.8-.6.6-.6.8-1.4.4-2.2-.2-.4-.6-.8-1-1-.6-.4-1.2-.6-1.8-.6z"/>
        </svg>
      )
    },
    {
      name: 'JavaScript',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      )
    },
    {
      name: 'React',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.563-.455-.468-.91-.991-1.36-1.563z"/>
        </svg>
      )
    },
    {
      name: 'Redux',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
          <path d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.047-.914-.796-1.648-1.709-1.648h-.061c-.943.047-1.695.848-1.648 1.807.047.42.233.786.512 1.02-1.091 2.173-2.816 3.78-5.236 4.912-1.648.782-3.344.88-4.992.297-1.273-.446-2.264-1.333-2.816-2.539C.912 16.185.912 14.537 1.633 13.2c.511-.953 1.273-1.648 1.648-2.077-.094-.42-.14-1.091-.047-1.648C.33 12.383-1.317 16.504 2.178 19.048c2.635 1.836 7.533 1.86 10.871-.42 2.635-1.789 3.78-4.425 3.585-7.533zM21.61 12.383c-2.635-3.014-6.756-4.425-10.871-3.033l.141-.42c.047-.467-.145-.934-.512-1.273-.75-.656-1.924-.609-2.635.14-.75.75-.656 1.924.14 2.635.328.281.75.42 1.178.42.328 0 .656-.094.934-.281l.512.326c4.425-2.635 9.547-1.178 11.454 3.033 1.41 3.033.326 6.756-2.635 8.862-2.17 1.507-5.236 1.507-7.406 0-.75-.42-1.343-.934-1.83-1.507-.375.234-.891.609-1.273.844 3.545 3.452 8.864 3.263 11.454.047 2.678-3.406 2.678-8.862-.047-12.383z"/>
        </svg>
      )
    },
    {
      name: 'Webkit',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1 4v12l9-6-9-6z"/>
        </svg>
      )
    },
    {
      name: 'Gulp',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
          <path d="M12.8 2.6c-.4-.2-.8-.2-1.2 0L4.4 6.2c-.6.3-.6 1.1 0 1.4l7.2 3.6c.4.2.8.2 1.2 0l7.2-3.6c.6-.3.6-1.1 0-1.4L12.8 2.6zm0 8.8L5.6 7.8v7.6c0 .6.4 1.2 1 1.4l5.8 2.9c.4.2.8.2 1.2 0l5.8-2.9c.6-.3 1-.8 1-1.4V7.8l-7.2 3.6z"/>
        </svg>
      )
    },
    {
      name: 'REST API',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
        </svg>
      )
    },
    {
      name: 'GIT',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.548-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
        </svg>
      )
    },
    {
      name: 'NEXT.js',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
          <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245z"/>
        </svg>

      )
    },
    {
      name: 'TypeScript',
      icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
      )
    },
    {
      name: 'MUI',
      icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
        <path d="M0 21.108V13.35l6 3.45V21l-6-.002v.11zM6 13.35l6-3.45v13.2L6 21V13.35zm12 3.45 6-3.45v7.758L18 21.108v-4.308zm0-3.45V9.9l-6 3.45 6 3.45v-3.45zM0 9.9l6 3.45L0 16.8V9.9zm6 3.45 6-3.45v-6.9L6 6.45 0 3l6-3 12 6.9v3.45l-6 3V13.35z"/>
      </svg>
      )
    },
    {
      name: 'GSAP',
      icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.885 7.442H6.113L12 3.557l5.885 3.885zM5.557 8.558h12.886v2.886L12 14.673 5.557 11.444V8.558zm0 3.887L12 15.673l6.443-3.228v4.997L12 20.443l-6.443-3.001v-4.997z"/>
      </svg>
      )
    },
    {
      name: 'Tailwind CSS',
      icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
      )
    },
    {
      name: 'Jest',
      icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
        <path d="M22.251 11.82a3.117 3.117 0 0 0-2.328-3.01L19.44 5.717a3.117 3.117 0 0 0-3.109-2.853H7.667a3.117 3.117 0 0 0-3.11 2.853l-.483 3.093a3.117 3.117 0 0 0-2.327 3.01 3.133 3.133 0 0 0 2.318 3.01l.483 3.093a3.117 3.117 0 0 0 3.11 2.853h8.663a3.117 3.117 0 0 0 3.11-2.853l.483-3.093a3.133 3.133 0 0 0 2.317-3.01zm-6.514 5.983c-.59.59-1.48.885-2.673.885-.787 0-1.476-.13-2.069-.391a3.535 3.535 0 0 1-1.396-1.094 2.637 2.637 0 0 1-.52-1.546h1.84c.039.334.17.619.394.856.223.237.516.388.88.453.363.066.704.05 1.02-.05.318-.099.578-.269.78-.51.202-.24.303-.538.303-.891 0-.286-.062-.53-.186-.73a1.684 1.684 0 0 0-.491-.51 3.63 3.63 0 0 0-.697-.374 16.56 16.56 0 0 0-.822-.31 6.576 6.576 0 0 1-1.043-.452 3.437 3.437 0 0 1-.799-.624 2.512 2.512 0 0 1-.512-.84 3.172 3.172 0 0 1-.178-1.087c0-.586.148-1.1.444-1.544.296-.443.705-.785 1.228-1.027.522-.242 1.123-.363 1.8-.363.712 0 1.33.128 1.852.385.52.257.92.617 1.198 1.078.276.462.42.993.428 1.594h-1.849a1.628 1.628 0 0 0-.364-.955c-.222-.254-.52-.38-.896-.38-.339 0-.621.094-.845.282a.94.94 0 0 0-.334.758c0 .266.07.485.212.659.14.173.338.324.59.452.254.128.554.256.901.382.508.172.967.361 1.38.566.411.206.759.454 1.044.745.284.291.497.638.64 1.041.14.403.212.872.212 1.407 0 .625-.152 1.16-.455 1.608z"/>
      </svg>
      )
    },
    {
      name: 'Vite',
      icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
        <path d="M21.295.19l-9.374 16.65a.25.25 0 0 1-.441-.003L2.762.19a.25.25 0 0 1 .261-.368l9.107 1.96a.248.248 0 0 0 .103 0l8.907-1.96a.25.25 0 0 1 .155.368zm-18.2 1.818L11.46 17.67l-8.52-15.9-.37.238h.525zm1.33 8.11-.008.006A6.2 6.2 0 0 0 2.9 14.13a6.236 6.236 0 0 0 6.237 6.237A6.236 6.236 0 0 0 15.374 14.13a6.2 6.2 0 0 0-1.52-4.01l-.007-.008-1.72 3.056a2.734 2.734 0 1 1-5.47 0l-1.72-3.056-.013.006z"/>
      </svg>
      )
    },
    {
      name: 'NPM',
      icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
        <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/>
      </svg>
      )
    },
    {
      name: 'node.js',
      icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
        <path d="M11.998.008a1.002 1.002 0 0 0-.496.133L.492 6.26C.19 6.437 0 6.75 0 7.094v9.812c0 .345.19.657.492.834l11.01 6.117c.303.17.673.17.976 0l3.624-2.013c.176-.1.176-.348 0-.449l-3.629-2.013c-.176-.1-.176-.35 0-.449l3.629-2.013c.176-.1.176-.349 0-.449l-3.63-2.017a.504.504 0 0 1-.248-.434V9.04c0-.178.095-.344.248-.433l2.007-1.116c.152-.085.34-.085.492 0l2.008 1.116c.153.09.248.255.248.433v2.23c0 .178-.095.343-.248.432l-2.008 1.116a.502.502 0 0 0 0 .868l5.527 3.07c.302.168.302.587 0 .754l-2.008 1.115a.502.502 0 0 1-.492 0L12.74 17.51a.502.502 0 0 0-.492 0l-2.008 1.116c-.151.085-.151.349 0 .434l2.008 1.116c.151.085.34.085.492 0l11.004-6.115c.303-.177.495-.489.495-.834V7.094c0-.344-.19-.657-.493-.834L12.495.141A1.002 1.002 0 0 0 11.998.008zm-.002 2.227l9.008 5.009v6.008l-9.008 5.01-9.008-5.01V7.244l9.008-5.01z"/>
      </svg>
      )
    },
    {
      name: 'WordPress',
      icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
        <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.109m-7.981.105c.647-.03 1.232-.105 1.232-.105.58-.075.514-.93-.067-.899 0 0-1.755.137-2.88.137-1.064 0-2.85-.15-2.85-.15-.579-.03-.645.855-.065.885 0 0 .554.075 1.14.105l1.695 4.65-2.38 7.128-3.953-11.778c.647-.03 1.232-.105 1.232-.105.58-.075.514-.93-.067-.899 0 0-1.755.137-2.88.137-.203 0-.44-.006-.69-.015C3.768 3.995 7.666 2.25 12 2.25c3.258 0 6.239 1.245 8.488 3.289-.054-.004-.108-.006-.164-.006-1.064 0-1.82.927-1.82 1.92 0 .894.515 1.65 1.065 2.549.413.72.894 1.65.894 2.985 0 .921-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.602zM12 21.75c-.977 0-1.919-.148-2.809-.42l2.983-8.664 3.056 8.371c.02.048.043.093.068.136A9.732 9.732 0 0 1 12 21.75zM2.25 12c0-1.651.37-3.22 1.026-4.624l5.646 15.474A9.737 9.737 0 0 1 2.25 12zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0"/>
      </svg>
      )
    },
    {
      name: 'WooCommerce',
      icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="tech-icon">
        <path d="M22.29 0H1.71C.766 0 0 .766 0 1.71v13.663c0 .944.766 1.71 1.71 1.71H8.58l-.898 5.429a.342.342 0 0 0 .54.329l6.217-5.758h7.851c.944 0 1.71-.766 1.71-1.71V1.71C24 .766 23.234 0 22.29 0zM4.853 10.053c-.342 1.116-1.03 1.764-2.048 1.764-.215 0-.423-.034-.611-.107l-.342 1.099H.806L2.57 6.945H3.62l-.198.647a1.86 1.86 0 0 1 1.04-.35c.81 0 1.316.562 1.316 1.521-.001.413-.068.868-.225 1.29zm5.17.548c-.342 1.049-.99 1.216-1.567 1.216-.82 0-1.37-.498-1.564-1.36l-.843 1.36h-1.05L6.73 6.944h1.048l-.94 3.036c.118.52.435.722.836.722.499 0 .831-.298.998-.856l.84-2.902h1.048l-1.016 3.27-.319 1.387v-.001zm5.11 1.216c-.82 0-1.374-.498-1.562-1.36l-.845 1.36h-1.049L13.84 6.944h1.048l-.94 3.036c.118.52.435.722.836.722.499 0 .833-.298.998-.856l.84-2.902h1.048l-1.016 3.27-.319 1.387v-.001c-.342 1.049-.99 1.216-1.162 1.216zM20.8 7.992c-.342-.237-.748-.357-1.215-.357-.48 0-.773.17-.879.512-.1.32.108.506.623.657l.536.164c.96.3 1.35.79 1.17 1.47-.207.785-.954 1.38-2.059 1.38-.556 0-1.054-.12-1.497-.356l.37-1.026c.404.236.857.356 1.357.356.572 0 .905-.2.99-.542.088-.35-.133-.55-.65-.7l-.497-.151c-.91-.276-1.283-.784-1.116-1.464.198-.786.935-1.322 1.966-1.322.52 0 .975.1 1.375.298L20.8 7.992z"/>
      </svg>
      )
    },
    {
      name: 'shadcn/ui',
      icon: (
      <svg viewBox="0 0 256 256" fill="none" className="tech-icon">
        <line
          x1="12208" y1="128" x2="128" y2="208"
          stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
        />
        <line
          x1="192" y1="40" x2="40" y2="192"
          stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
        />
      </svg>
      )
    },
    {
      name: 'Claude (Anthropic)',
      icon: (
      <svg viewBox="0 0 234 136" fill="currentColor" className="tech-icon" xmlns="http://www.w3.org/2000/svg">
  {/* CLAUDE - linia 1 */}
  <rect x="26" y="20" width="5" height="5" rx="1"/><rect x="32" y="20" width="6" height="6" rx="1"/><rect x="38" y="20" width="6" height="6" rx="1"/>
  <rect x="20" y="26" width="6" height="6" rx="1"/><rect x="44" y="26" width="6" height="6" rx="1"/>
  <rect x="20" y="32" width="6" height="6" rx="1"/><rect x="20" y="38" width="6" height="6" rx="1"/><rect x="20" y="44" width="6" height="6" rx="1"/>
  <rect x="20" y="50" width="6" height="6" rx="1"/><rect x="44" y="50" width="6" height="6" rx="1"/>
  <rect x="26" y="56" width="6" height="6" rx="1"/><rect x="32" y="56" width="6" height="6" rx="1"/><rect x="38" y="56" width="6" height="6" rx="1"/>
  <rect x="54" y="20" width="6" height="6" rx="1"/><rect x="54" y="26" width="6" height="6" rx="1"/><rect x="54" y="32" width="6" height="6" rx="1"/>
  <rect x="54" y="38" width="6" height="6" rx="1"/><rect x="54" y="44" width="6" height="6" rx="1"/><rect x="54" y="50" width="6" height="6" rx="1"/><rect x="78" y="50" width="6" height="6" rx="1"/>
  <rect x="54" y="56" width="6" height="6" rx="1"/><rect x="60" y="56" width="6" height="6" rx="1"/><rect x="66" y="56" width="6" height="6" rx="1"/><rect x="72" y="56" width="6" height="6" rx="1"/><rect x="78" y="56" width="6" height="6" rx="1"/>
  <rect x="100" y="20" width="6" height="6" rx="1"/><rect x="94" y="26" width="6" height="6" rx="1"/><rect x="106" y="26" width="6" height="6" rx="1"/>
  <rect x="88" y="32" width="6" height="6" rx="1"/><rect x="112" y="32" width="6" height="6" rx="1"/><rect x="88" y="38" width="6" height="6" rx="1"/><rect x="112" y="38" width="6" height="6" rx="1"/>
  <rect x="88" y="44" width="6" height="6" rx="1"/><rect x="94" y="44" width="6" height="6" rx="1"/><rect x="100" y="44" width="6" height="6" rx="1"/><rect x="106" y="44" width="6" height="6" rx="1"/><rect x="112" y="44" width="6" height="6" rx="1"/>
  <rect x="88" y="50" width="6" height="6" rx="1"/><rect x="112" y="50" width="6" height="6" rx="1"/><rect x="88" y="56" width="6" height="6" rx="1"/><rect x="112" y="56" width="6" height="6" rx="1"/>
  <rect x="122" y="20" width="6" height="6" rx="1"/><rect x="146" y="20" width="6" height="6" rx="1"/>
  <rect x="122" y="26" width="6" height="6" rx="1"/><rect x="146" y="26" width="6" height="6" rx="1"/>
  <rect x="122" y="32" width="6" height="6" rx="1"/><rect x="146" y="32" width="6" height="6" rx="1"/>
  <rect x="122" y="38" width="6" height="6" rx="1"/><rect x="146" y="38" width="6" height="6" rx="1"/>
  <rect x="122" y="44" width="6" height="6" rx="1"/><rect x="146" y="44" width="6" height="6" rx="1"/>
  <rect x="122" y="50" width="6" height="6" rx="1"/><rect x="146" y="50" width="6" height="6" rx="1"/>
  <rect x="128" y="56" width="6" height="6" rx="1"/><rect x="134" y="56" width="6" height="6" rx="1"/><rect x="140" y="56" width="6" height="6" rx="1"/>
  <rect x="156" y="20" width="6" height="6" rx="1"/><rect x="162" y="20" width="6" height="6" rx="1"/><rect x="168" y="20" width="6" height="6" rx="1"/>
  <rect x="156" y="26" width="6" height="6" rx="1"/><rect x="174" y="26" width="6" height="6" rx="1"/>
  <rect x="156" y="32" width="6" height="6" rx="1"/><rect x="180" y="32" width="6" height="6" rx="1"/>
  <rect x="156" y="38" width="6" height="6" rx="1"/><rect x="180" y="38" width="6" height="6" rx="1"/>
  <rect x="156" y="44" width="6" height="6" rx="1"/><rect x="180" y="44" width="6" height="6" rx="1"/>
  <rect x="156" y="50" width="6" height="6" rx="1"/><rect x="174" y="50" width="6" height="6" rx="1"/>
  <rect x="156" y="56" width="6" height="6" rx="1"/><rect x="162" y="56" width="6" height="6" rx="1"/><rect x="168" y="56" width="6" height="6" rx="1"/>
  <rect x="190" y="20" width="6" height="6" rx="1"/><rect x="196" y="20" width="6" height="6" rx="1"/><rect x="202" y="20" width="6" height="6" rx="1"/><rect x="208" y="20" width="6" height="6" rx="1"/><rect x="214" y="20" width="6" height="6" rx="1"/>
  <rect x="190" y="26" width="6" height="6" rx="1"/><rect x="190" y="32" width="6" height="6" rx="1"/>
  <rect x="190" y="38" width="6" height="6" rx="1"/><rect x="196" y="38" width="6" height="6" rx="1"/><rect x="202" y="38" width="6" height="6" rx="1"/><rect x="208" y="38" width="6" height="6" rx="1"/>
  <rect x="190" y="44" width="6" height="6" rx="1"/><rect x="190" y="50" width="6" height="6" rx="1"/>
  <rect x="190" y="56" width="6" height="6" rx="1"/><rect x="196" y="56" width="6" height="6" rx="1"/><rect x="202" y="56" width="6" height="6" rx="1"/><rect x="208" y="56" width="6" height="6" rx="1"/><rect x="214" y="56" width="6" height="6" rx="1"/>
  {/* CODE - linia 2 */}
  <rect x="59" y="74" width="6" height="6" rx="1"/><rect x="65" y="74" width="6" height="6" rx="1"/><rect x="71" y="74" width="6" height="6" rx="1"/>
  <rect x="53" y="80" width="6" height="6" rx="1"/><rect x="77" y="80" width="6" height="6" rx="1"/>
  <rect x="53" y="86" width="6" height="6" rx="1"/><rect x="53" y="92" width="6" height="6" rx="1"/><rect x="53" y="98" width="6" height="6" rx="1"/>
  <rect x="53" y="104" width="6" height="6" rx="1"/><rect x="77" y="104" width="6" height="6" rx="1"/>
  <rect x="59" y="110" width="6" height="6" rx="1"/><rect x="65" y="110" width="6" height="6" rx="1"/><rect x="71" y="110" width="6" height="6" rx="1"/>
  <rect x="93" y="74" width="6" height="6" rx="1"/><rect x="99" y="74" width="6" height="6" rx="1"/><rect x="105" y="74" width="6" height="6" rx="1"/>
  <rect x="87" y="80" width="6" height="6" rx="1"/><rect x="111" y="80" width="6" height="6" rx="1"/>
  <rect x="87" y="86" width="6" height="6" rx="1"/><rect x="111" y="86" width="6" height="6" rx="1"/>
  <rect x="87" y="92" width="6" height="6" rx="1"/><rect x="111" y="92" width="6" height="6" rx="1"/>
  <rect x="87" y="98" width="6" height="6" rx="1"/><rect x="111" y="98" width="6" height="6" rx="1"/>
  <rect x="87" y="104" width="6" height="6" rx="1"/><rect x="111" y="104" width="6" height="6" rx="1"/>
  <rect x="93" y="110" width="6" height="6" rx="1"/><rect x="99" y="110" width="6" height="6" rx="1"/><rect x="105" y="110" width="6" height="6" rx="1"/>
  <rect x="121" y="74" width="6" height="6" rx="1"/><rect x="127" y="74" width="6" height="6" rx="1"/><rect x="133" y="74" width="6" height="6" rx="1"/>
  <rect x="121" y="80" width="6" height="6" rx="1"/><rect x="139" y="80" width="6" height="6" rx="1"/>
  <rect x="121" y="86" width="6" height="6" rx="1"/><rect x="145" y="86" width="6" height="6" rx="1"/>
  <rect x="121" y="92" width="6" height="6" rx="1"/><rect x="145" y="92" width="6" height="6" rx="1"/>
  <rect x="121" y="98" width="6" height="6" rx="1"/><rect x="145" y="98" width="6" height="6" rx="1"/>
  <rect x="121" y="104" width="6" height="6" rx="1"/><rect x="139" y="104" width="6" height="6" rx="1"/>
  <rect x="121" y="110" width="6" height="6" rx="1"/><rect x="127" y="110" width="6" height="6" rx="1"/><rect x="133" y="110" width="6" height="6" rx="1"/>
  <rect x="155" y="74" width="6" height="6" rx="1"/><rect x="161" y="74" width="6" height="6" rx="1"/><rect x="167" y="74" width="6" height="6" rx="1"/><rect x="173" y="74" width="6" height="6" rx="1"/><rect x="179" y="74" width="6" height="6" rx="1"/>
  <rect x="155" y="80" width="6" height="6" rx="1"/><rect x="155" y="86" width="6" height="6" rx="1"/>
  <rect x="155" y="92" width="6" height="6" rx="1"/><rect x="161" y="92" width="6" height="6" rx="1"/><rect x="167" y="92" width="6" height="6" rx="1"/><rect x="173" y="92" width="6" height="6" rx="1"/>
  <rect x="155" y="98" width="6" height="6" rx="1"/><rect x="155" y="104" width="6" height="6" rx="1"/>
  <rect x="155" y="110" width="6" height="6" rx="1"/><rect x="161" y="110" width="6" height="6" rx="1"/><rect x="167" y="110" width="6" height="6" rx="1"/><rect x="173" y="110" width="6" height="6" rx="1"/><rect x="179" y="110" width="6" height="6" rx="1"/>
</svg>
      )
    },
  ];

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    const banner = bannerRef.current;
    if (!carousel || !banner) return;

    // Obliczamy szerokość połowy zawartości (jednego zestawu ikon)
    const loopWidth = carousel.scrollWidth / 2;

    // Ustawiamy stan początkowy na piksele (x), a nie procenty, aby uniknąć konfliktu z dragiem
    gsap.set(carousel, { x: 0, xPercent: 0 });

    const tween = gsap.to(carousel, {
      x: -loopWidth, // Animujemy do ujemnej wartości szerokości pętli w pikselach
      duration: 30, // Czas trwania jednego cyklu
      ease: 'none',
      repeat: -1,
    });

    let startX = 0;
    let startX_tween = 0;
    let isDragging = false;

    const onDragStart = (e) => {
      isDragging = true;
      banner.classList.add('is-dragging');
      // e.preventDefault(); // Zakomentowane, aby nie blokować scrollowania strony na mobile, jeśli gest jest pionowy
      const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      startX = x;
      startX_tween = gsap.getProperty(carousel, 'x');
      // Animacja jest już pauzowana przez najechanie myszą (mouseenter), ale dla touch musimy zadbać o pauzę
      tween.pause();
    };

    const onDragMove = (e) => {
      if (!isDragging) return;
      const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const walk = x - startX;
      gsap.set(carousel, { x: startX_tween + walk });
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      banner.classList.remove('is-dragging');
      
      // Po zakończeniu przeciągania, synchronizujemy postęp animacji
      const currentX = gsap.getProperty(carousel, 'x');
      
      // Obliczamy progress (0 do 1) na podstawie przesunięcia w pikselach
      // Ponieważ ruch jest w lewo (ujemny x), dzielimy -currentX przez loopWidth
      let progress = (-currentX / loopWidth) % 1;

      // Obsługa przypadku, gdy użytkownik przeciągnął w prawo (dodatni x)
      if (progress < 0) {
        progress += 1;
      }
      
      // Aktualizujemy postęp tweenera i wznawiamy. 
      // Ponieważ tween operuje teraz na 'x' (pikselach), automatycznie nadpisze pozycję z draga, zachowując ciągłość.
      tween.progress(progress).resume();
    };

    // Pauzowanie animacji przy najechaniu
    const handleMouseEnter = () => tween.pause();
    const handleMouseLeave = () => {
      if (!isDragging) tween.resume();
    };

    // Dodajemy event listenery
    banner.addEventListener('mouseenter', handleMouseEnter);
    banner.addEventListener('mouseleave', handleMouseLeave);
    banner.addEventListener('mousedown', onDragStart);
    banner.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('touchmove', onDragMove, { passive: true });
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchend', onDragEnd);

    return () => {
      tween.kill();
      banner.removeEventListener('mouseenter', handleMouseEnter);
      banner.removeEventListener('mouseleave', handleMouseLeave);
      banner.removeEventListener('mousedown', onDragStart);
      banner.removeEventListener('touchstart', onDragStart);
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('touchmove', onDragMove);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, []);

  return (
    <section className="tech-banner" ref={bannerRef}>
      <div className="banner-container">
        {/* Gradient overlays for smooth fade effect */}
        <div className="gradient-left"></div>
        <div className="gradient-right"></div>
        
        {/* Carousel container */}
        <div className="carousel" ref={carouselRef}>
          {/* First set of technologies */}
          {technologies.map((tech, index) => (
            <div key={`first-${index}`} className="tech-item">
              <div className="icon-container">
                {tech.icon}
              </div>
              <span className="tech-name">
                {tech.name}
              </span>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {technologies.map((tech, index) => (
            <div key={`second-${index}`} className="tech-item">
              <div className="icon-container">
                {tech.icon}
              </div>
              <span className="tech-name">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechBanner;