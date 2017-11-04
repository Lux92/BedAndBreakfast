-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Nov 04, 2017 alle 17:45
-- Versione del server: 10.1.25-MariaDB
-- Versione PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bedandbreackfast`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `booking`
--

CREATE TABLE `booking` (
  `Id` int(11) NOT NULL,
  `Date` datetime(6) NOT NULL,
  `Id_guest` int(11) NOT NULL,
  `Id_room` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `booking`
--

INSERT INTO `booking` (`Id`, `Date`, `Id_guest`, `Id_room`) VALUES
(1, '2017-10-26 00:00:00.000000', 1, 1),
(2, '2012-12-12 00:00:00.000000', 2, 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `guest`
--

CREATE TABLE `guest` (
  `Id` int(11) NOT NULL,
  `CellNumb` longtext,
  `FiscalCode` longtext,
  `Gender` bit(1) NOT NULL,
  `Name` longtext,
  `Surname` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `guest`
--

INSERT INTO `guest` (`Id`, `CellNumb`, `FiscalCode`, `Gender`, `Name`, `Surname`) VALUES
(1, ' 346 99 456 34', 'AJJBRZF223XVWF', b'1111111111111111111111111111111', 'Ayeye', 'Brazorf'),
(3, ' 333 123 6738', 'ADJIOCJIOFJW2  ', b'1111111111111111111111111111111', 'Franco', 'Ciccio');

-- --------------------------------------------------------

--
-- Struttura della tabella `room`
--

CREATE TABLE `room` (
  `Num` int(11) NOT NULL,
  `Capacity` int(11) NOT NULL,
  `Name` longtext,
  `Price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `room`
--

INSERT INTO `room` (`Num`, `Capacity`, `Name`, `Price`) VALUES
(1, 3, 'Yellow Room', 25),
(2, 4, 'Black Room', 100),
(3, 4, 'Withe Room', 120),
(4, 4, 'Black Room', 120),
(5, 2, 'Red Room', 130);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`Id`);

--
-- Indici per le tabelle `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`Id`);

--
-- Indici per le tabelle `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`Num`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `booking`
--
ALTER TABLE `booking`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT per la tabella `guest`
--
ALTER TABLE `guest`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT per la tabella `room`
--
ALTER TABLE `room`
  MODIFY `Num` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
